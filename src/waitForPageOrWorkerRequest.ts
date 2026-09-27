import type { Page, Request, CDPSession } from '@playwright/test'
import { flatRequestUrl } from './flatRequestUrl'

interface TargetRequest {
  url: string
  method: string
  /** Payload enviado no corpo da requisição, se houver. */
  postData?: string
}

/**
 * Estrutura do payload recebido através do evento `Target.receivedMessageFromTarget` do CDP,
 * contendo as notificações de rede emitidas pelos workers (`Network.requestWillBeSent`).
 */
interface TargetMessage {
  method: string
  params: {
    request: TargetRequest
  }
}

/**
 * Armazena a Promise de inicialização da sessão CDP associada a cada instância de `Page`.
 *
 * O uso de `WeakMap` garante que a referência seja liberada automaticamente pelo garbage collector
 * quando o objeto `Page` for descartado, além de garantir que a configuração do CDP (auto-attach)
 * seja executada apenas uma vez por página durante os testes.
 */
const cdpSessionsByPage = new WeakMap<Page, Promise<CDPSession>>()

/**
 * Obtém uma sessão CDP existente ou inicializa uma nova para a página informada.
 *
 * Configura o auto-attach para capturar Service Workers, Web Workers e Shared Workers,
 * habilitando o domínio de rede (`Network.enable`) em cada target anexado para permitir
 * a interceptação de chamadas de rede em segundo plano.
 *
 * @param page - Instância da página do Playwright (`Page`).
 * @returns Promise que resolve com a sessão CDP (`CDPSession`) ativa e configurada.
 */
async function getOrCreateWorkerCDPSession(page: Page): Promise<CDPSession> {
  let sessionPromise = cdpSessionsByPage.get(page)

  if (!sessionPromise) {
    sessionPromise = (async () => {
      const client = await page.context().newCDPSession(page)

      // Anexa automaticamente a Service Workers, Workers e Shared Workers
      await client.send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: false, flatten: false })
      client.on('Target.attachedToTarget', async ({ sessionId, targetInfo }) => {
        if (['service_worker', 'worker', 'shared_worker'].includes(targetInfo.type)) {
          await client.send('Target.sendMessageToTarget', {
            sessionId,
            message: JSON.stringify({ id: 1, method: 'Network.enable' }),
          })
        }
      })

      // Limpeza da sessão caso a página feche antes do término do teste
      page.once('close', () => {
        cdpSessionsByPage.delete(page)
      })

      return client
    })()
    cdpSessionsByPage.set(page, sessionPromise)
  }
  return sessionPromise
}

/**
 * Aguarda por uma requisição de rede que coincida com o padrão especificado,
 * monitorando simultaneamente a página principal e background workers (Service Workers,
 * Web Workers e Shared Workers).
 *
 * A correspondência de URL é realizada via {@link flatRequestUrl}, que combina a URL
 * e os parâmetros enviados no corpo (`postData`), permitindo casar requisições tanto
 * por query string quanto por dados de formulário/payload.
 *
 * A Promise é resolvida com a primeira requisição que casar com o padrão fornecido,
 * seja ela originada no documento principal (retornando um {@link Request} do Playwright)
 * ou em um worker (retornando um {@link TargetRequest}).
 *
 * @param page - Instância da página do Playwright (`Page`) a ser monitorada.
 * @param urlPattern - Expressão regular (`RegExp`) ou substring (`string`) para validação da URL e payload.
 * @param options - Configurações opcionais de espera.
 * @param options.timeout - Tempo limite máximo de espera em milissegundos antes de rejeitar a Promise (padrão: 10000ms / 10s).
 * @returns Uma Promise que resolve para o {@link Request} nativo do Playwright (se originado na página)
 * ou para um {@link TargetRequest} (se capturado a partir de um worker via CDP).
 * @throws {Error} Rejeita com mensagem de erro caso o tempo limite configurado em `options.timeout` expire antes da requisição ser detectada.
 *
 * @example
 * ```typescript
 * // Aguardando requisição com RegExp (funciona se vier da página ou de Service Worker)
 * const request = await waitForPageOrWorkerRequest(page, /\/api\/analytics\/collect/)
 * console.log('Requisição capturada:', request.url)
 * ```
 *
 * @example
 * ```typescript
 * // Aguardando requisição por substring com timeout customizado de 15 segundos
 * const request = await waitForPageOrWorkerRequest(page, 'google-analytics.com', { timeout: 15000 })
 * ```
 */
export async function waitForPageOrWorkerRequest(
  page: Page,
  urlPattern: RegExp | string,
  options: { timeout?: number } = { timeout: 10000 },
): Promise<Request | TargetRequest> {
  // Garante que a sessão CDP esteja ativa e configurada antes de registrar os ouvintes
  const client: CDPSession = await getOrCreateWorkerCDPSession(page)

  return new Promise<Request | TargetRequest>((resolve, reject) => {
    let timer: NodeJS.Timeout

    // Listener da Página: intercepta requisições disparadas pelo contexto padrão do documento
    const pageListener = (request: Request) => {
      const url = flatRequestUrl(request)
      const matched = typeof urlPattern === 'string' ? url.includes(urlPattern) : urlPattern.test(url)
      if (matched) {
        cleanup()
        resolve(request)
      }
    }

    // Listener de Workers: intercepta eventos de rede encaminhados pelos workers via CDP
    const workerListener = ({ message }: { sessionId: string; message: string }) => {
      try {
        const data: TargetMessage = JSON.parse(message)
        if (data.method === 'Network.requestWillBeSent') {
          const url = flatRequestUrl(data.params.request)
          const matched = typeof urlPattern === 'string' ? url.includes(urlPattern) : urlPattern.test(url)
          if (matched) {
            cleanup()
            resolve(data.params.request)
          }
        }
      } catch {
        // Ignora mensagens que não sejam JSON válido ou com formato inesperado
      }
    }

    // Remove todos os ouvintes e cancela o temporizador ao concluir ou falhar
    const cleanup = () => {
      clearTimeout(timer)
      page.off('request', pageListener)
      client.off('Target.receivedMessageFromTarget', workerListener)
    }

    // Dispara erro de timeout caso nenhuma requisição compatível seja capturada a tempo
    timer = setTimeout(() => {
      cleanup()
      reject(new Error(`Timeout de ${options.timeout}ms aguardando requisição: ${urlPattern}`))
    }, options.timeout)

    // Inicia a escuta nos dois canais simultaneamente
    page.on('request', pageListener)
    client.on('Target.receivedMessageFromTarget', workerListener)
  })
}

