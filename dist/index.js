"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMatcherCb = exports.requestMatcherCb = exports.responseMatcher = exports.requestMatcher = exports.flatResponseUrl = exports.flatRequestUrl = void 0;
exports.saveJsonToGlitch = saveJsonToGlitch;
exports.fetchJsonFromGlitch = fetchJsonFromGlitch;
exports.saveSessionCookies = saveSessionCookies;
exports.restoreSessionCookies = restoreSessionCookies;
exports.previewGTM = previewGTM;
exports.enableGADebug = enableGADebug;
exports.scrollToBottom = scrollToBottom;
const axios_1 = require("axios");
/*************************************************************
 ********* Manipulação de URLs / Requests - begin ************
 *************************************************************/
/**
 * Returns a flattened request URL by combining the URL and postData parameters
 * of the given Request object.
 * @param {Request} req The Request object containing the URL and postData.
 * @return {*}  {string} A string representing the flattened request URL.
 */
const flatRequestUrl = (req) => {
    const url = req.url();
    const body = req.postData() || '';
    if (!body)
        return url;
    const flatUrl = `${url}${url.includes('?') ? '&' : '?'}${body}`;
    return flatUrl
        .replace(/\r\n|\n|\r/g, '&')
        .replace(/&&/g, '&')
        .replace(/&$/g, '');
};
exports.flatRequestUrl = flatRequestUrl;
/**
 * Returns a flattened request URL from Response object, by combining the URL and postData
 * parameters of the given Response's Request object.
 *
 * @param {Response} res A Response object
 * @return {*}  {string} A string representing the flattened request URL.
 */
const flatResponseUrl = (res) => (0, exports.flatRequestUrl)(res.request());
exports.flatResponseUrl = flatResponseUrl;
/**
 * Accepts a pattern, and returns a function that returns true if a
 * request is matched by the pattern.
 * @param pattern - pattern to match the request URL.
 */
const requestMatcher = (pattern) => (req) => typeof pattern === 'string' ? (0, exports.flatRequestUrl)(req).includes(pattern) : pattern.test((0, exports.flatRequestUrl)(req));
exports.requestMatcher = requestMatcher;
/**
 * Accepts a pattern, and returns a function that returns true if a
 * response is matched by the pattern.
 * @param pattern - pattern to match the response URL.
 */
const responseMatcher = (pattern) => (res) => typeof pattern === 'string'
    ? (0, exports.flatResponseUrl)(res).includes(pattern)
    : pattern.test((0, exports.flatResponseUrl)(res));
exports.responseMatcher = responseMatcher;
/**
 * Accepts a pattern and a callback function, and returns a function that
 * returns true if a request is matched by the pattern, and executes the
 * callback with the request object as parameter.
 * @param pattern - pattern to match the request URL.
 * @param cb - Callback function that will be executed after if the request is matched.
 */
const requestMatcherCb = (pattern, cb) => (req) => {
    if ((0, exports.requestMatcher)(pattern)(req)) {
        try {
            cb(req);
        }
        catch (e) { }
        return true;
    }
    else {
        return false;
    }
};
exports.requestMatcherCb = requestMatcherCb;
/**
 * Accepts a pattern and a callback function, and returns a function that
 * returns true if a response is matched by the pattern, and executes the
 * callback with the response object as parameter.
 * @param pattern - Pattern to match the request URL.
 * @param cb - Callback function that will be executed after if the request is matched.
 */
const responseMatcherCb = (pattern, cb) => (res) => {
    if ((0, exports.responseMatcher)(pattern)(res)) {
        try {
            cb(res);
        }
        catch (e) { }
        return true;
    }
    else {
        return false;
    }
};
exports.responseMatcherCb = responseMatcherCb;
/*************************************************************
 *********** Manipulação de URLs / Requests - end ************
 *************************************************************/
/*************************************************************
 ******* Guarda/restaura cookies no Glitch - begin ***********
 *************************************************************/
async function saveJsonToGlitch(key, data, expires) {
    await axios_1.default.post(`https://lourenco-json-storage.glitch.me/${key}`, {
        data,
        expires,
    });
}
async function fetchJsonFromGlitch(key) {
    return (await axios_1.default.get(`https://lourenco-json-storage.glitch.me/${key}`)).data;
}
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
async function saveSessionCookies(context, key, expires) {
    const cookies = await context.cookies();
    if (cookies.length) {
        await saveJsonToGlitch(key, cookies, expires);
    }
}
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
async function restoreSessionCookies(context, key) {
    const cookies = await fetchJsonFromGlitch(key);
    if (cookies) {
        await context.addCookies(cookies);
        return true;
    }
    return false;
}
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
async function previewGTM(context, tagAssistantUrl) {
    let url = new URL(tagAssistantUrl.replace('#/', ''));
    const containerId = url.searchParams.get('id');
    const gtm_auth = url.searchParams.get('gtm_auth');
    const gtm_preview = url.searchParams.get('gtm_preview');
    await context.route(new RegExp(`googletagmanager.com/gtm.js\\?id=${containerId}(?!.*gtm_auth=)(?!.*gtm_preview=)`), route => route.continue({
        url: `https://www.googletagmanager.com/gtm.js?id=${containerId}&gtm_auth=${gtm_auth}&gtm_preview=${gtm_preview}&cb=${Date.now()}`,
    }));
}
/**
 * Simula a extensão Google Analytics Debugger (https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna),
 * habilitando debug de GA3 (analytics.js) e GA4 (gtag).
 */
async function enableGADebug(context) {
    // Debug de GA3
    await context.route('https://www.google-analytics.com/analytics.js', route => route.continue({
        url: 'https://www.google-analytics.com/analytics_debug.js',
    }));
    // Adiciona mais informações de debug
    await context.addInitScript('window.ga_debug = { trace: true }');
    // Debug de GA4/gtag
    await context.addCookies([
        {
            name: 'gtm_debug',
            value: 'LOG=x',
            url: 'https://www.googletagmanager.com/',
            sameSite: 'None',
            secure: true,
        },
    ]);
}
/**
 * Realiza scroll até o fundo da página, suavemente.
 */
async function scrollToBottom({ page, timeToWaitAfterScroll = 0, returnToTop = true, }) {
    while (await page.evaluate('scrollY + outerHeight + 10 < document.body.scrollHeight')) {
        await page.evaluate(() => scrollBy({ behavior: 'smooth', top: 1.5 * outerHeight }));
        await page.waitForTimeout(700);
    }
    if (returnToTop)
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }));
    if (timeToWaitAfterScroll > 0)
        await page.waitForTimeout(timeToWaitAfterScroll);
}
//# sourceMappingURL=index.js.map