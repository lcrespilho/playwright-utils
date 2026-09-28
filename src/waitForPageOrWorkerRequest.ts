import type { Page, Request, CDPSession } from '@playwright/test'
import { flatRequestUrl } from './flatRequestUrl'
import { getOrCreateWorkerCDPSession } from './workerCDPSession'
import type { WorkerRequest, WorkerMessage } from './workerCDPSession'

/**
 * Aguarda por uma requisição de rede que coincida com o padrão especificado,
 * monitorando simultaneamente a página principal e background workers (Service Workers,
 * Web Workers e Shared Workers).
 *
 * A correspondência de URL é realizada via {@link flatRequestUrl}, que combina a URL
 * e os parâmetros enviados no corpo (`postData`) da requisição.
 *
 * A Promise é resolvida com a primeira requisição que casar com o padrão fornecido,
 * seja ela originada no documento principal (retornando um {@link Request} do Playwright)
 * ou em um worker (retornando um {@link WorkerRequest}).
 */
export async function waitForPageOrWorkerRequest(
  page: Page,
  urlPattern: RegExp | string,
  options: { timeout?: number } = { timeout: 10000 },
): Promise<Request | WorkerRequest> {
  const client: CDPSession = await getOrCreateWorkerCDPSession(page)

  return new Promise<Request | WorkerRequest>((resolve, reject) => {
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
        const data: WorkerMessage = JSON.parse(message)
        if (data.method === 'Network.requestWillBeSent') {
          const fullUrl = flatWorkerRequestUrl(data.params.request!)
          const matched = typeof urlPattern === 'string' ? fullUrl.includes(urlPattern) : urlPattern.test(fullUrl)
          if (matched) {
            cleanup()
            resolve(data.params.request!)
          }
        }
      } catch {
        // Ignora mensagens inválidas
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

export const flatWorkerRequestUrl = (req: WorkerRequest): string => {
  const url = req.url
  const body = req.postData
  if (!body) return url
  const flatUrl = `${url}${url.includes('?') ? '&' : '?'}${body}`
  return flatUrl
    .replace(/\r\n|\n|\r/g, '&')
    .replace(/&&/g, '&')
    .replace(/&$/g, '')
}
