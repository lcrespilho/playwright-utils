/**
 * Centraliza a sessão CDP e o WeakMap para que Request e Response compartilhem a mesma conexão
 */

import type { Page, CDPSession } from '@playwright/test'

/**
 * Armazena a Promise de inicialização da sessão CDP associada a cada instância de Page
 */
const cdpSessionsByPage = new WeakMap<Page, Promise<CDPSession>>()

/**
 * Obtém uma sessão CDP existente ou inicializa uma nova para a página informada.
 */
export async function getOrCreateWorkerCDPSession(page: Page): Promise<CDPSession> {
  let sessionPromise = cdpSessionsByPage.get(page)

  if (!sessionPromise) {
    sessionPromise = (async () => {
      const client = await page.context().newCDPSession(page)

      client.on('Target.attachedToTarget', async ({ sessionId, targetInfo, waitingForDebugger }) => {
        await client.send('Target.sendMessageToTarget', {
          sessionId,
          message: JSON.stringify({ id: 1, method: 'Runtime.runIfWaitingForDebugger' }),
        })
        if (targetInfo.type === 'service_worker') {
          await client.send('Target.sendMessageToTarget', {
            sessionId,
            message: JSON.stringify({ id: 1, method: 'Network.enable' }),
          })
        }
      })

      await client.send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: false })
      page.once('close', () => cdpSessionsByPage.delete(page))

      return client
    })()
    cdpSessionsByPage.set(page, sessionPromise)
  }
  return sessionPromise
}

/**
 * (Warmup) Inicializa previamente a sessão CDP e configuração de auto-attach para a página.
 * Deve ser utilizada em `test.beforeEach`, antes do uso das funções `waitForPageOrWorkerRequest`
 * e `waitForPageOrWorkerResponse`.
 */
export async function initWorkerCDPSession(page: Page): Promise<CDPSession> {
  return getOrCreateWorkerCDPSession(page)
}

export type WorkerRequest = {
  url: string
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | 'OPTIONS'
  /** Payload enviado no corpo da requisição, se houver. */
  postData?: string
}

export type WorkerResponse = {
  url: string
  status: number
  statusText: string
  headers: Record<string, string>
  mimeType: string
  /** Requisição original correlacionada - inserido artificialmente, pois não existe no original */
  request: WorkerRequest
}

/**
 * Estrutura do payload recebido no método "Network.requestWillBeSent" do evento CDP `Target.receivedMessageFromTarget`.
 */
export type WorkerMessage = {
  method: 'Network.requestWillBeSent' | 'Network.responseReceived' | 'Network.loadingFailed'
  params: {
    requestId: string
    request?: WorkerRequest // Existe quando method === 'Network.requestWillBeSent'
    response?: WorkerResponse // Existe quando method === 'Network.responseReceived', porém ele não contém o postData, nem o objeto request.
  }
}
