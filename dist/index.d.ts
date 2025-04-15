import type { Request, Response, BrowserContext, Page } from '@playwright/test';
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
 * Returns a flattened request URL from Response object, by combining the URL and postData
 * parameters of the given Response's Request object.
 *
 * @param {Response} res A Response object
 * @return {*}  {string} A string representing the flattened request URL.
 */
export declare const flatResponseUrl: (res: Response) => string;
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
 * @param {string} tagAssistantUrl - url completa de preview do Tag Assistant. Ex: https://tagassistant.google.com/?authuser=8&hl=en&utm_source=gtm#/?source=TAG_MANAGER&id=GTM-123123&gtm_auth=cDqGMWuJkUq73urprdYOAw&gtm_preview=env-869&cb=8635696129626987
 * @example
 * ```typescript
 * test.beforeEach(async ({ context }) => {
 *   await previewGTM(context, 'https://tagassistant.google.com/?authuser=8&hl=en&utm_source=gtm#/?source=TAG_MANAGER&id=GTM-123123&gtm_auth=cDqGMWuJkUq73urprdYOAw&gtm_preview=env-869&cb=8635696129626987');
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
/**
 * Waits for a specific Web To Server request to be made and returns its details.
 *
 * @export
 * @throws {Error} Throws an error if events_received is not equal to 1
 *
 * @example
 * ```typescript
 * const { event_data, event_id, requestUrl } = await waitForWebToServer({
 *   page,
 *   eventName: 'page_view',
 *   timeout: 15000
 * })
 * console.log(event_id, requestUrl)
 * ```
 */
export declare function waitForWebToServer({ page, eventName, eventId, timeout, }: {
    page: Page;
    /**
     * Optional The name of the Web To Server event to wait for
     */
    eventName?: string;
    /**
     * Optional Unique identifier for the event to match
     */
    eventId?: string;
    /**
     * Optional Timeout in milliseconds (defaults to Playwright's default timeout)
     */
    timeout?: number;
}): Promise<{
    /**
     * Name of the event
     */
    event_name: string;
    /**
     * Unique identifier for the event
     */
    event_id: string;
    /**
     * Sent event payload containing event-specific information
     */
    event_data: Record<string, any>;
    responseBody: {
        request: {
            data: Record<string, any>[];
        };
        /**
         * Facebook CAPI response - this is not from WTS implementation. It's specific
         * to Electrolux sGTM WTS implementation. It's not "universal" and don't exist
         * in another clients.
         */
        response: {
            /**
             * Should be 1 for successful requests
             */
            events_received: number;
            /**
             * Error messages
             */
            messages: string[];
            /**
             * Facebook trace ID for debugging
             */
            fbtrace_id: string;
        };
    };
    /**
     * Complete url of the Web To Server request
     */
    requestUrl: string;
}>;
/**
 * Waits for a specific Facebook Pixel request to be make and returns its details.
 *
 * @export
 *
 * @example
 * ```typescript
 * const { event_id, requestUrl } = await waitForFacebookPixel({
 *   page,
 *   eventName: 'PageView',
 *   pixelId: '123123123123',
 *   timeout: 15000
 * })
 * console.log(event_id, requestUrl)
 * ```
 */
export declare function waitForFacebookPixel({ page, eventName, pixelId, eventId, timeout, }: {
    page: Page;
    /**
     * Optional The name of the pixel event to wait for
     */
    eventName?: string;
    /**
     * Optional Facebook Pixel ID to match
     */
    pixelId?: string;
    /**
     * Optional Unique identifier for the event to match
     */
    eventId?: string;
    /**
     * Optional Timeout in milliseconds (defaults to Playwright's default timeout)
     */
    timeout?: number;
}): Promise<{
    /**
     * Name of the event
     */
    event_name: string;
    /**
     * Unique identifier for the event
     */
    event_id: string;
    /**
     * Facebook Pixel ID.
     */
    pixel_id: string;
    /**
     * Complete url of the request
     */
    requestUrl: string;
}>;
