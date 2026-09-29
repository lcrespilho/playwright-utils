"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableGADebug = exports.previewGTM = exports.responseMatcherCb = exports.responseMatcher = exports.requestMatcherCb = exports.requestMatcher = exports.flatResponseUrl = exports.flatRequestUrl = void 0;
exports.scrollToBottom = scrollToBottom;
exports.highlightLocator = highlightLocator;
var flatRequestUrl_1 = require("./flatRequestUrl");
Object.defineProperty(exports, "flatRequestUrl", { enumerable: true, get: function () { return flatRequestUrl_1.flatRequestUrl; } });
var flatResponseUrl_1 = require("./flatResponseUrl");
Object.defineProperty(exports, "flatResponseUrl", { enumerable: true, get: function () { return flatResponseUrl_1.flatResponseUrl; } });
var requestResponseMatchers_1 = require("./requestResponseMatchers");
Object.defineProperty(exports, "requestMatcher", { enumerable: true, get: function () { return requestResponseMatchers_1.requestMatcher; } });
Object.defineProperty(exports, "requestMatcherCb", { enumerable: true, get: function () { return requestResponseMatchers_1.requestMatcherCb; } });
Object.defineProperty(exports, "responseMatcher", { enumerable: true, get: function () { return requestResponseMatchers_1.responseMatcher; } });
Object.defineProperty(exports, "responseMatcherCb", { enumerable: true, get: function () { return requestResponseMatchers_1.responseMatcherCb; } });
var previewGTM_1 = require("./previewGTM");
Object.defineProperty(exports, "previewGTM", { enumerable: true, get: function () { return previewGTM_1.previewGTM; } });
var enableGADebug_1 = require("./enableGADebug");
Object.defineProperty(exports, "enableGADebug", { enumerable: true, get: function () { return enableGADebug_1.enableGADebug; } });
/**
 * Realiza scroll até o fundo da página, suavemente.
 */
async function scrollToBottom({ page, timeToWaitAfterScroll = 0, returnToTop = true, timeout = Infinity, }) {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout &&
        (await page.evaluate('scrollY + innerHeight + 20 < document.body.scrollHeight'))) {
        await page.evaluate(() => scrollBy({ behavior: 'smooth', top: 1.5 * innerHeight }));
        await page.waitForTimeout(700);
    }
    if (returnToTop)
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }));
    if (timeToWaitAfterScroll > 0)
        await page.waitForTimeout(timeToWaitAfterScroll);
}
/**
 * Highlights a locator on the page.
 * @example
 * ```typescript
 * const locator = page.getByRole('button', { name: 'Click Me' })
 * await highlightLocator(locator)
 * ```
 */
async function highlightLocator(locator) {
    await locator.evaluate(element => {
        element.style.border = '4px solid red';
        element.style.boxShadow = '0 0 20px 10px rgba(255, 0, 0, 0.5)';
        element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxtREFBaUQ7QUFBeEMsZ0hBQUEsY0FBYyxPQUFBO0FBQ3ZCLHFEQUFtRDtBQUExQyxrSEFBQSxlQUFlLE9BQUE7QUFDeEIscUVBQWdIO0FBQXZHLHlIQUFBLGNBQWMsT0FBQTtBQUFFLDJIQUFBLGdCQUFnQixPQUFBO0FBQUUsMEhBQUEsZUFBZSxPQUFBO0FBQUUsNEhBQUEsaUJBQWlCLE9BQUE7QUFDN0UsMkNBQXlDO0FBQWhDLHdHQUFBLFVBQVUsT0FBQTtBQUNuQixpREFBK0M7QUFBdEMsOEdBQUEsYUFBYSxPQUFBO0FBRXRCOztHQUVHO0FBQ0ksS0FBSyx5QkFBeUIsRUFDbkMsSUFBSSxFQUNKLHFCQUFxQixHQUFHLENBQUMsRUFDekIsV0FBVyxHQUFHLElBQUksRUFDbEIsT0FBTyxHQUFHLFFBQVEsR0FrQm5CO0lBQ0MsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLE9BQ0UsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxPQUFPO1FBQ3pCLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLHlEQUF5RCxDQUFDLENBQUMsRUFDaEYsQ0FBQztRQUNELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ25GLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBQ0QsSUFBSSxXQUFXO1FBQUUsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNwRixJQUFJLHFCQUFxQixHQUFHLENBQUM7UUFBRSxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUNqRixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNJLEtBQUssMkJBQTJCLE9BQWdCO0lBQ3JELE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUE7UUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsb0NBQW9DLENBQUE7UUFDOUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsd0JBQXdCLENBQUE7SUFDMUQsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDIn0=