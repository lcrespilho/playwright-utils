import type { Request, Response, BrowserContext, Page } from 'playwright';
/*************************************************************
 ********* Manipulação de URLs / Requests - begin ************
 *************************************************************/
/**
 * Returns a flattened request URL by combining the URL and postData parameters
 * of the given Request object.
 * @param {Request} req The Request object containing the URL and postData.
 * @return {*}  {string} A string representing the flattened request URL.
 */
export declare const flatRequestUrl: (req: Request) => string;
/**
 * Accepts a pattern, and returns a function that returns true if a
 * request is matched by the pattern.
 * @param pattern - pattern to match the request URL.
 */
export declare const requestMatcher: (pattern: RegExp | string) => (req: Request) => boolean;
/**
 * Accepts a pattern, and returns a function that returns true if a
 * response is matched by the pattern.
 * @param pattern - pattern to match the response URL.
 */
export declare const responseMatcher: (pattern: RegExp | string) => (res: Response) => boolean;
/**
 * Accepts a pattern and a callback function, and returns a function that
 * returns true if a request is matched by the pattern, and executes the
 * callback with the request object as parameter.
 * @param pattern - pattern to match the request URL.
 * @param cb - Callback function that will be executed after if the request is matched.
 */
export declare const requestMatcherCb: (pattern: RegExp | string, cb: (req: Request) => void) => (req: Request) => boolean;
/**
 * Accepts a pattern and a callback function, and returns a function that
 * returns true if a response is matched by the pattern, and executes the
 * callback with the response object as parameter.
 * @param pattern - Pattern to match the request URL.
 * @param cb - Callback function that will be executed after if the request is matched.
 */
export declare const responseMatcherCb: (pattern: RegExp | string, cb: (res: Response) => void) => (res: Response) => boolean;
/*************************************************************
 *********** Manipulação de URLs / Requests - end ************
 *************************************************************/
/*************************************************************
 ******* Guarda/restaura cookies no Glitch - begin ***********
 *************************************************************/
export declare function saveJsonToGlitch(key: string, data: any, expires?: number): Promise<void>;
export declare function fetchJsonFromGlitch(key: string): Promise<any>;
/**
 * Salva os cookies do contexto no Glitch.
 *
 * @export
 * @param {BrowserContext} context - Contexto do browser.
 * @param {string} key - Nome da sessão no Glitch, usado para resgatar a sessão.
 * @param {number} [expires] - tempo em s para guardar a sessão remotamente. Default 48h.
 * @example
 * ```typescript
 * import { saveSessionCookies, restoreSessionCookies } from '../../utils/helpers';
 * // antes de começar o teste, restaura a sessão anterior, se houver.
 * test.beforeEach(async ({ context }) => {
 *   await restoreSessionCookies(context, 'session-123');
 * });
 * // após o teste, salva a sessão atual, para que possa ser restaurada posteriormente.
 * test.afterEach(async ({ context }) => {
 *   await saveSessionCookies(context, 'session-123', 2 * 60 * 60);
 * });
 * ```
 */
export declare function saveSessionCookies(context: BrowserContext, key: string, expires?: number): Promise<void>;
/**
 * Restaura, no contexto do browser, os cookies previamente salvos no Glitch.
 *
 * @export
 * @param {BrowserContext} context - Contexto do browser.
 * @param {string} key - Nome da sessão no Glitch, usado para resgatar a sessão.
 * @example
 * ```typescript
 * import { saveSessionCookies, restoreSessionCookies } from '../../utils/helpers';
 * // antes de começar o teste, restaura a sessão anterior, se houver.
 * test.beforeEach(async ({ context }) => {
 *   await restoreSessionCookies(context, 'session-123');
 * });
 * // após o teste, salva a sessão atual, para que possa ser restaurada posteriormente.
 * test.afterEach(async ({ context }) => {
 *   await saveSessionCookies(context, 'session-123', 2 * 60 * 60);
 * });
 * ```
 */
export declare function restoreSessionCookies(context: BrowserContext, key: string): Promise<boolean>;
/*************************************************************
 ********* Guarda/restaura cookies no Glitch - end ***********
 *************************************************************/
/**
 * Realiza preview do GTM. Deve ser utilizada via `test.beforeEach` ou no próprio `test`.
 *
 * @export
 * @param {BrowserContext} context - Contexto do browser.
 * @param {string} tagAssistantUrl - url completa de preview do Tag Assistant.
 * @example
 * ```typescript
 * test.beforeEach(async ({ context }) => {
 *   await previewGTM(context, 'https://tagassistant.google.com/#/?source=TAG_MANAGER&id=GTM-123&gtm_auth=456&gtm_preview=env-913&cb=1051629219902535');
 * });
 * ```
 */
export declare function previewGTM(context: BrowserContext, tagAssistantUrl: string): Promise<void>;
/**
 * Simula a extensão Google Analytics Debugger (https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna),
 * habilitando debug de GA3 (analytics.js) e GA4 (gtag).
 */
export declare function enableGADebug(context: BrowserContext): Promise<void>;
/**
 * Realiza scroll até o fundo da página, suavemente.
 */
export declare function scrollToBottom({ page, timeToWaitAfterScroll, returnToTop, }: {
    /**
     * The page to be scrolled.
     */
    page: Page;
    /**
     * Time to wait, in ms, after finish scrolling to the bottom of the page. [Default = 0 (no wait)]
     */
    timeToWaitAfterScroll?: number;
    /**
     * If should return to top after scroll to the bottom. [Default = true (return to top)]
     */
    returnToTop?: boolean;
}): Promise<void>;
