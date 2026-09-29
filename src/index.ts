import type { Request, BrowserContext, Page, Locator } from '@playwright/test'
export { flatRequestUrl } from './flatRequestUrl'
export { flatResponseUrl } from './flatResponseUrl'
export { requestMatcher, requestMatcherCb, responseMatcher, responseMatcherCb } from './requestResponseMatchers'
export { previewGTM } from './previewGTM'
export { enableGADebug } from './enableGADebug'

/**
 * Realiza scroll até o fundo da página, suavemente.
 */
export async function scrollToBottom({
  page,
  timeToWaitAfterScroll = 0,
  returnToTop = true,
  timeout = Infinity,
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
  /**
   * Optional timeout in ms to wait for the scroll to bottom action to complete. [Default = Infinity]
   */
  timeout?: number
}) {
  const t0 = Date.now()
  while (
    Date.now() - t0 < timeout &&
    (await page.evaluate('scrollY + innerHeight + 20 < document.body.scrollHeight'))
  ) {
    await page.evaluate(() => scrollBy({ behavior: 'smooth', top: 1.5 * innerHeight }))
    await page.waitForTimeout(700)
  }
  if (returnToTop) await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }))
  if (timeToWaitAfterScroll > 0) await page.waitForTimeout(timeToWaitAfterScroll)
}

/**
 * Highlights a locator on the page.
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
