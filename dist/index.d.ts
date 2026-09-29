import type { Page, Locator } from '@playwright/test';
export { flatRequestUrl } from './flatRequestUrl';
export { flatResponseUrl } from './flatResponseUrl';
export { requestMatcher, requestMatcherCb, responseMatcher, responseMatcherCb } from './requestResponseMatchers';
export { previewGTM } from './previewGTM';
export { enableGADebug } from './enableGADebug';
/**
 * Realiza scroll até o fundo da página, suavemente.
 */
export declare function scrollToBottom({ page, timeToWaitAfterScroll, returnToTop, timeout, }: {
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
    /**
     * Optional timeout in ms to wait for the scroll to bottom action to complete. [Default = Infinity]
     */
    timeout?: number;
}): Promise<void>;
/**
 * Highlights a locator on the page.
 * @example
 * ```typescript
 * const locator = page.getByRole('button', { name: 'Click Me' })
 * await highlightLocator(locator)
 * ```
 */
export declare function highlightLocator(locator: Locator): Promise<void>;
