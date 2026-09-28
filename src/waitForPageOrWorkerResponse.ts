import type { Page, Response, CDPSession } from '@playwright/test'
import { flatResponseUrl } from './flatResponseUrl'
import { flatRequestUrl } from './flatRequestUrl'
import { getOrCreateWorkerCDPSession } from './workerCDPSession'
import { flatWorkerRequestUrl } from './waitForPageOrWorkerRequest'
import type { WorkerRequest, WorkerMessage, WorkerResponse } from './workerCDPSession'

/**
 * Aguarda por uma resposta de rede que coincida com o padrão especificado,
 * monitorando simultaneamente a página principal e background workers (Service Workers,
 * Web Workers e Shared Workers).
 *
 * A correspondência de URL é realizada via {@link flatRequestUrl} e {@link flatResponseUrl},
 * que combinam a URL e os parâmetros enviados no corpo (`postData`) da requisição.
 *
 * A Promise é resolvida com a primeira response que casar com o padrão fornecido,
 * seja ela originada no documento principal (retornando um {@link Response} do Playwright)
 * ou em um worker (retornando um {@link WorkerResponse}).
 */
export async function waitForPageOrWorkerResponse(
  page: Page,
  urlPattern: RegExp | string,
  options: { timeout?: number } = { timeout: 10000 },
): Promise<Response | WorkerResponse> {
  const client: CDPSession = await getOrCreateWorkerCDPSession(page)

  return new Promise<Response | WorkerResponse>((resolve, reject) => {
    let timer: NodeJS.Timeout
    // Fila para guardar os in-flight requets correlacionados por requestId
    const pendingRequests = new Map<string, WorkerRequest>()

    // Listener da Página nativo do Playwright
    const pageListener = (response: Response) => {
      const url = flatResponseUrl(response)
      const matched = typeof urlPattern === 'string' ? url.includes(urlPattern) : urlPattern.test(url)
      if (matched) {
        cleanup()
        resolve(response)
      }
    }

    // Listener dos Workers via CDP
    const workerListener = ({ message }: { sessionId: string; message: string }) => {
      try {
        const data: WorkerMessage = JSON.parse(message)

        // 1. Armazena apenas requisições que coincidem com urlPattern
        if (data.method === 'Network.requestWillBeSent' && data.params.request) {
          const url = flatWorkerRequestUrl(data.params.request)
          const matched = typeof urlPattern === 'string' ? url.includes(urlPattern) : urlPattern.test(url)
          if (matched) {
            pendingRequests.set(data.params.requestId, data.params.request)
          }
        }

        // 2. Quando a resposta chega do servidor
        if (data.method === 'Network.responseReceived' && data.params.response) {
          const request = pendingRequests.get(data.params.requestId)
          if (request) {
            cleanup()
            resolve({
              ...data.params.response,
              request, // para manter compatibilidade com o response.request() nativo do Playwright
            })
          }
        }

        // 3. Limpeza, se a requisição de rede falhar (sem conexão, DNS, timeout de socket, CORS, Adblock, etc)
        if (data.method === 'Network.loadingFailed') {
          pendingRequests.delete(data.params.requestId)
        }
      } catch {
        // Ignora mensagens inválidas
      }
    }

    const cleanup = () => {
      clearTimeout(timer)
      pendingRequests.clear()
      page.off('response', pageListener)
      client.off('Target.receivedMessageFromTarget', workerListener)
    }

    // Dispara erro de timeout caso nenhuma resposta compatível seja capturada a tempo
    timer = setTimeout(() => {
      cleanup()
      reject(new Error(`Timeout de ${options.timeout}ms aguardando resposta: ${urlPattern}`))
    }, options.timeout)

    // Inicia a escuta nos dois canais simultaneamente
    page.on('response', pageListener)
    client.on('Target.receivedMessageFromTarget', workerListener)
  })
}

export const flatWorkerResponseUrl = (res: WorkerResponse): string => flatWorkerRequestUrl(res.request)
