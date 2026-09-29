"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const previewGTM_1 = require("./previewGTM");
const test_1 = require("@playwright/test");
test_1.test.beforeEach(async ({ context }) => {
    await (0, previewGTM_1.previewGTM)(context, 'https://tagassistant.google.com/?hl=en&utm_source=gtm#/?source=TAG_MANAGER&id=GTM-WRKNVS&canonical_id=2289496&gtm_auth=7iKIiPB5CTFZKhy1pUR9XQ&gtm_preview=env-4679&cb=5867270239726247');
});
(0, test_1.test)('previewGTM retorna a versão de preview', async ({ page }) => {
    const responsePromise = page.waitForResponse(response => {
        const url = new URL(response.url());
        return url.pathname === '/gtm.js' && url.searchParams.get('id') === 'GTM-WRKNVS';
    });
    // Adiciona em about:blank mesmo. Funciona!
    await page.addScriptTag({
        url: 'https://www.googletagmanager.com/gtm.js?id=GTM-WRKNVS',
    });
    const response = await responsePromise;
    (0, test_1.expect)(response.ok()).toBe(true);
    (0, test_1.expect)(await response.text()).toContain('"version":"QUICK_PREVIEW"');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlld0dUTS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ByZXZpZXdHVE0uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUN6QywyQ0FBK0M7QUFFL0MsV0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0lBQ3BDLE1BQU0sSUFBQSx1QkFBVSxFQUNkLE9BQU8sRUFDUCx3TEFBd0wsQ0FDekwsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBQSxXQUFJLEVBQUMsd0NBQXdDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtJQUNoRSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3RELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ25DLE9BQU8sR0FBRyxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssWUFBWSxDQUFBO0lBQ2xGLENBQUMsQ0FBQyxDQUFBO0lBRUYsMkNBQTJDO0lBQzNDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN0QixHQUFHLEVBQUUsdURBQXVEO0tBQzdELENBQUMsQ0FBQTtJQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFBO0lBRXRDLElBQUEsYUFBTSxFQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxJQUFBLGFBQU0sRUFBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0FBQ3RFLENBQUMsQ0FBQyxDQUFBIn0=