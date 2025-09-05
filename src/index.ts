import type { Request, Response, BrowserContext, Page, Locator } from '@playwright/test'
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
export const flatResponseUrl = (res: Response): string => flatRequestUrl(res.request())

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
  typeof pattern === 'string' ? flatResponseUrl(res).includes(pattern) : pattern.test(flatResponseUrl(res))

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
 * Realiza preview do GTM. Pode ser utilizada em `test.beforeEach` ou `test`.
 *
 * @export
 * @param {Page | BrowserContext} pageOrContext - Contexto ou página do browser.
 * @param {string} tagAssistantUrl - url completa de preview do Tag Assistant. Ex: https://tagassistant.google.com/?authuser=8&hl=en&utm_source=gtm#/?source=TAG_MANAGER&id=GTM-123123&gtm_auth=cDqGMWuJkUq73urprdYOAw&gtm_preview=env-869&cb=8635696129626987
 * @example
 * ```typescript
 * test.beforeEach(async ({ context }) => {
 *   await previewGTM(context, 'https://tagassistant.google.com/?authuser=8&hl=en&utm_source=gtm#/?source=TAG_MANAGER&id=GTM-123123&gtm_auth=cDqGMWuJkUq73urprdYOAw&gtm_preview=env-869&cb=8635696129626987');
 * });
 * ```
 */
export async function previewGTM(pageOrContext: Page | BrowserContext, tagAssistantUrl: string) {
  let taUrl = new URL(tagAssistantUrl.replace(/\/\?.*?#\/\?/, '/?'))
  const containerId = taUrl.searchParams.get('id')
  const gtm_auth = taUrl.searchParams.get('gtm_auth')
  const gtm_preview = taUrl.searchParams.get('gtm_preview')
  await pageOrContext.route(
    new RegExp(`gtm.js\\?id=${containerId}(?!.*gtm_auth=)(?!.*gtm_preview=)`),
    (route, request) => {
      const requestHostname = new URL(request.url()).hostname
      route.continue({
        url: `https://${requestHostname}/gtm.js?id=${containerId}&gtm_auth=${gtm_auth}&gtm_preview=${gtm_preview}&cb=${Date.now()}`,
      })
    }
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
  while (await page.evaluate('scrollY + innerHeight + 20 < document.body.scrollHeight')) {
    await page.evaluate(() => scrollBy({ behavior: 'smooth', top: 1.5 * innerHeight }))
    await page.waitForTimeout(700)
  }
  if (returnToTop) await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }))
  if (timeToWaitAfterScroll > 0) await page.waitForTimeout(timeToWaitAfterScroll)
}

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
export async function waitForWebToServer({
  page,
  eventName = '',
  eventId = '',
  timeout,
}: {
  page: Page
  /**
   * Optional The name of the Web To Server event to wait for
   */
  eventName?: string
  /**
   * Optional Unique identifier for the event to match
   */
  eventId?: string
  /**
   * Optional Timeout in milliseconds (defaults to Playwright's default timeout)
   */
  timeout?: number
}): Promise<{
  /**
   * Name of the event
   */
  event_name: string
  /**
   * Unique identifier for the event
   */
  event_id: string
  /**
   * Sent event payload containing event-specific information
   */
  event_data: Record<string, any>
  responseBody: {
    request: {
      data: Record<string, any>[]
    }
    /**
     * Facebook CAPI response - this is not from WTS implementation. It's specific
     * to Electrolux sGTM WTS implementation. It's not "universal" and don't exist
     * in another clients.
     */
    response: {
      /**
       * Should be 1 for successful requests
       */
      events_received: number
      /**
       * Error messages
       */
      messages: string[]
      /**
       * Facebook trace ID for debugging
       */
      fbtrace_id: string
    }
  }
  /**
   * Complete url of the Web To Server request
   */
  requestUrl: string
}> {
  let re: RegExp = new RegExp(`/web-to-server\\?en=${eventName || '.*?'}&eid=${eventId}`)
  let request: Request
  if (timeout) {
    request = await page.waitForRequest(request => re.test(request.url()), { timeout })
  } else {
    request = await page.waitForRequest(request => re.test(request.url()))
  }
  const responseBody: {
    request: {
      data: Record<string, any>[]
    }
    response: {
      events_received: number
      messages: string[]
      fbtrace_id: string
    }
  } = await (await request.response())?.json()
  let {
    en: event_name,
    eid: event_id,
    ed: event_data_string,
  } = Object.fromEntries(new URL(request.url()).searchParams.entries())
  const event_data: Record<string, any> = JSON.parse(Buffer.from(event_data_string, 'base64').toString('utf8'))
  if (responseBody.response.events_received !== 1) throw new Error(JSON.stringify(responseBody.response))
  return { event_name, event_id, event_data, responseBody, requestUrl: request.url() }
}

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
export async function waitForFacebookPixel({
  page,
  eventName = '',
  pixelId = '',
  eventId = '',
  timeout,
}: {
  page: Page
  /**
   * Optional The name of the pixel event to wait for
   */
  eventName?: string
  /**
   * Optional Facebook Pixel ID to match
   */
  pixelId?: string
  /**
   * Optional Unique identifier for the event to match
   */
  eventId?: string
  /**
   * Optional Timeout in milliseconds (defaults to Playwright's default timeout)
   */
  timeout?: number
}): Promise<{
  /**
   * Name of the event
   */
  event_name: string
  /**
   * Unique identifier for the event
   */
  event_id: string
  /**
   * Facebook Pixel ID.
   */
  pixel_id: string
  /**
   * Complete url of the request
   */
  requestUrl: string
}> {
  let re: RegExp = new RegExp(`facebook.com/tr/\\?id=${pixelId || '.*?'}&ev=${eventName}&.*&eid=${eventId}`)
  let request: Request
  if (timeout) {
    request = await page.waitForRequest(request => re.test(request.url()), { timeout })
  } else {
    request = await page.waitForRequest(request => re.test(request.url()))
  }
  let {
    eid: event_id,
    ev: event_name,
    id: pixel_id,
  } = Object.fromEntries(new URL(request.url()).searchParams.entries())
  return { event_name, event_id, pixel_id, requestUrl: request.url() }
}

/**
 * Highlights a locator on the page.
 * @param locator The locator to highlight.
 * @export
 * @example
 * ```typescript
 * const locator = page.getByRole('button', { name: 'Click Me' })
 * await highlightLocator(locator)
 * ```
 */
export async function highlightLocator(locator: Locator) {
  await locator.evaluate(element => {
    element.style.border = '4px solid red'
    element.style.boxShadow = '0 0 20px 10px rgba(255, 0, 0, 0.5)'
    element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)'
  })
}
