import type { Page, Request } from '@playwright/test';
interface TargetRequest {
    url: string;
    method: string;
    /** Payload enviado no corpo da requisição, se houver. */
    postData?: string;
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
export declare function waitForPageOrWorkerRequest(page: Page, urlPattern: RegExp | string, options?: {
    timeout?: number;
}): Promise<Request | TargetRequest>;
export {};
