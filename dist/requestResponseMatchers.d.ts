import { RequestLike } from './flatRequestUrl';
import { ResponseLike } from './flatResponseUrl';
/**
 * Cria um predicado que verifica se a URL achatada da requisição corresponde ao padrão.
 * @example
 * ```ts
 * const request = await page.waitForRequest(requestMatcher('/api/users'))
 * ```
 */
export declare const requestMatcher: (pattern: RegExp | string) => (req: RequestLike) => boolean;
/**
 * Cria um predicado que verifica se a URL achatada da resposta corresponde ao padrão.
 * @example
 * ```ts
 * const response = await page.waitForResponse(responseMatcher('/api/users'))
 * ```
 */
export declare const responseMatcher: (pattern: RegExp | string) => (res: ResponseLike) => boolean;
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
export declare const requestMatcherCb: (pattern: RegExp | string, cb: (req: RequestLike) => void) => (req: RequestLike) => boolean;
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
export declare const responseMatcherCb: (pattern: RegExp | string, cb: (res: ResponseLike) => void) => (res: ResponseLike) => boolean;
