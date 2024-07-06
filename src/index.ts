import type { Request, Response, BrowserContext, Page } from 'playwright'
import axios from 'axios'

/*************************************************************
 ********* Manipulação de URLs / Requests - begin ************
 *************************************************************/

/**
 * Returns a flattened request URL by combining the URL and postData parameters
 * of the given Request object.
 * @param {Request} req The Request object containing the URL and postData.
 * @return {*}  {string} A string representing the flattened request URL.
 */
export const flatRequestUrl = (req: Request): string => {
  const url = req.url()
  const body = req.postData() || ''
  if (!body) return url
  const flatUrl = `${url}${url.includes('?') ? '&' : '?'}${body}`
  return flatUrl
    .replace(/\r\n|\n|\r/g, '&')
    .replace(/&&/g, '&')
    .replace(/&$/g, '')
}
/**
 * Returns a flattened request URL from Response object, by combining the URL and postData
 * parameters of the given Response's Request object.
 *
 * @param {Response} res A Response object
 * @return {*}  {string} A string representing the flattened request URL.
 */
const flatResponseUrl = (res: Response): string => flatRequestUrl(res.request())

/**
 * Accepts a pattern, and returns a function that returns true if a
 * request is matched by the pattern.
 * @param pattern - pattern to match the request URL.
 */
export const requestMatcher = (pattern: RegExp | string) => (req: Request) =>
  typeof pattern === 'string' ? flatRequestUrl(req).includes(pattern) : pattern.test(flatRequestUrl(req))

/**
 * Accepts a pattern, and returns a function that returns true if a
 * response is matched by the pattern.
 * @param pattern - pattern to match the response URL.
 */
export const responseMatcher = (pattern: RegExp | string) => (res: Response) =>
  typeof pattern === 'string'
    ? flatResponseUrl(res).includes(pattern)
    : pattern.test(flatResponseUrl(res))

/**
 * Accepts a pattern and a callback function, and returns a function that
 * returns true if a request is matched by the pattern, and executes the
 * callback with the request object as parameter.
 * @param pattern - pattern to match the request URL.
 * @param cb - Callback function that will be executed after if the request is matched.
 */
export const requestMatcherCb = (pattern: RegExp | string, cb: (req: Request) => void) => (req: Request) => {
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
 * Accepts a pattern and a callback function, and returns a function that
 * returns true if a response is matched by the pattern, and executes the
 * callback with the response object as parameter.
 * @param pattern - Pattern to match the request URL.
 * @param cb - Callback function that will be executed after if the request is matched.
 */
export const responseMatcherCb = (pattern: RegExp | string, cb: (res: Response) => void) => (res: Response) => {
  if (responseMatcher(pattern)(res)) {
    try {
      cb(res)
    } catch (e) {}
    return true
  } else {
    return false
  }
}

/*************************************************************
 *********** Manipulação de URLs / Requests - end ************
 *************************************************************/

/*************************************************************
 ******* Guarda/restaura cookies no Glitch - begin ***********
 *************************************************************/

export async function saveJsonToGlitch(key: string, data: any, expires?: number) {
  await axios.post(`https://lourenco-json-storage.glitch.me/${key}`, {
    data,
    expires,
  })
}

export async function fetchJsonFromGlitch(key: string) {
  return (await axios.get(`https://lourenco-json-storage.glitch.me/${key}`)).data
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
export async function saveSessionCookies(context: BrowserContext, key: string, expires?: number) {
  const cookies = await context.cookies()
  if (cookies.length) {
    await saveJsonToGlitch(key, cookies, expires)
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
export async function restoreSessionCookies(context: BrowserContext, key: string) {
  const cookies = await fetchJsonFromGlitch(key)
  if (cookies) {
    await context.addCookies(cookies)
    return true
  }
  return false
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
export async function previewGTM(context: BrowserContext, tagAssistantUrl: string) {
  let url = new URL(tagAssistantUrl.replace('#/', ''))
  const containerId = url.searchParams.get('id')
  const gtm_auth = url.searchParams.get('gtm_auth')
  const gtm_preview = url.searchParams.get('gtm_preview')
  await context.route(
    new RegExp(`googletagmanager.com/gtm.js\\?id=${containerId}(?!.*gtm_auth=)(?!.*gtm_preview=)`),
    route =>
      route.continue({
        url: `https://www.googletagmanager.com/gtm.js?id=${containerId}&gtm_auth=${gtm_auth}&gtm_preview=${gtm_preview}&cb=${Date.now()}`,
      })
  )
}

/**
 * Simula a extensão Google Analytics Debugger (https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna),
 * habilitando debug de GA3 (analytics.js) e GA4 (gtag).
 */
export async function enableGADebug(context: BrowserContext) {
  // Debug de GA3
  await context.route('https://www.google-analytics.com/analytics.js', route =>
    route.continue({
      url: 'https://www.google-analytics.com/analytics_debug.js',
    })
  )
  // Adiciona mais informações de debug
  await context.addInitScript('window.ga_debug = { trace: true }')

  // Debug de GA4/gtag
  await context.addCookies([
    {
      name: 'gtm_debug',
      value: 'LOG=x',
      url: 'https://www.googletagmanager.com/',
      sameSite: 'None',
      secure: true,
    },
  ])
}

/**
 * Realiza scroll até o fundo da página, suavemente.
 */
export async function scrollToBottom({
  page,
  timeToWaitAfterScroll = 0,
  returnToTop = true,
}: {
  /**
   * The page to be scrolled.
   */
  page: Page
  /**
   * Time to wait, in ms, after finish scrolling to the bottom of the page. [Default = 0 (no wait)]
   */
  timeToWaitAfterScroll?: number
  /**
   * If should return to top after scroll to the bottom. [Default = true (return to top)]
   */
  returnToTop?: boolean
}) {
  while (await page.evaluate('scrollY + outerHeight + 10 < document.body.scrollHeight')) {
    await page.evaluate(() => scrollBy({ behavior: 'smooth', top: 1.5 * outerHeight }))
    await page.waitForTimeout(700)
  }
  if (returnToTop) await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }))
  if (timeToWaitAfterScroll > 0) await page.waitForTimeout(timeToWaitAfterScroll)
}
