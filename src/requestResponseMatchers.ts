import { flatRequestUrl, RequestLike } from './flatRequestUrl'
import { flatResponseUrl, ResponseLike } from './flatResponseUrl'

/**
 * Cria um predicado que verifica se a URL achatada da requisição corresponde ao padrão.
 * @example
 * ```ts
 * const request = await page.waitForRequest(requestMatcher('/api/users'))
 * ```
 */
export const requestMatcher = (pattern: RegExp | string) => (req: RequestLike) =>
  typeof pattern === 'string' ? flatRequestUrl(req).includes(pattern) : pattern.test(flatRequestUrl(req))

/**
 * Cria um predicado que verifica se a URL achatada da resposta corresponde ao padrão.
 * @example
 * ```ts
 * const response = await page.waitForResponse(responseMatcher('/api/users'))
 * ```
 */
export const responseMatcher = (pattern: RegExp | string) => (res: ResponseLike) =>
  typeof pattern === 'string' ? flatResponseUrl(res).includes(pattern) : pattern.test(flatResponseUrl(res))

/**
 * Cria um predicado que, ao encontrar uma requisição correspondente, executa o callback
 * e retorna `true`. Erros lançados pelo callback são ignorados.
 * @example
 * ```ts
 * await page.waitForRequest(
 *   requestMatcherCb('/api/users', req => console.log(req.method()))
 * )
 * ```
 */
export const requestMatcherCb = (pattern: RegExp | string, cb: (req: RequestLike) => void) => (req: RequestLike) => {
  if (requestMatcher(pattern)(req)) {
    try {
      cb(req)
    } catch (e) {}
    return true
  } else {
    return false
  }
}

/**
 * Cria um predicado que, ao encontrar uma resposta correspondente, executa o callback
 * e retorna `true`. Erros lançados pelo callback são ignorados.
 * @example
 * ```ts
 * await page.waitForResponse(
 *   responseMatcherCb('/api/users', res => console.log(res.status()))
 * )
 * ```
 */
export const responseMatcherCb = (pattern: RegExp | string, cb: (res: ResponseLike) => void) => (res: ResponseLike) => {
  if (responseMatcher(pattern)(res)) {
    try {
      cb(res)
    } catch (e) {}
    return true
  } else {
    return false
  }
}
