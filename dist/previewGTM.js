"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewGTM = previewGTM;
/**
 * Executa uma versão específica do GTM, sem abrir o Tag Assistant.
 * Deve ser utilizada em `test.beforeEach` ou `test`.
 * @example
 * ```typescript
 * test.beforeEach(async ({ context }) => {
 *   await previewGTM(context, 'https://tagassistant.google.com/?authuser=8&hl=en&utm_source=gtm#/?source=TAG_MANAGER&id=GTM-123123&gtm_auth=cDqGMWuJkUq73urprdYOAw&gtm_preview=env-869&cb=8635696129626987');
 * });
 * ```
 */
async function previewGTM(pageOrContext, tagAssistantUrl) {
    let taUrl = new URL(tagAssistantUrl.replace(/^(https:\/\/[^/?#]+)\/(?:\?[^#]*)?#\/\?(.*)$/, '$1/?$2'));
    const containerId = taUrl.searchParams.get('id');
    const gtm_auth = taUrl.searchParams.get('gtm_auth');
    const gtm_preview = taUrl.searchParams.get('gtm_preview');
    await pageOrContext.route(new RegExp(`gtm.js\\?id=${containerId}(?!.*gtm_auth=)(?!.*gtm_preview=)`), (route, request) => {
        const requestHostname = new URL(request.url()).hostname;
        route.continue({
            url: `https://${requestHostname}/gtm.js?id=${containerId}&gtm_auth=${gtm_auth}&gtm_preview=${gtm_preview}&cb=${Date.now()}`,
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlld0dUTS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcmV2aWV3R1RNLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOzs7Ozs7Ozs7R0FTRztBQUNJLEtBQUsscUJBQXFCLGFBQW9DLEVBQUUsZUFBdUI7SUFDNUYsSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyw4Q0FBOEMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO0lBQ3RHLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ25ELE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3pELE1BQU0sYUFBYSxDQUFDLEtBQUssQ0FDdkIsSUFBSSxNQUFNLENBQUMsZUFBZSxXQUFXLG1DQUFtQyxDQUFDLEVBQ3pFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQ2pCLE1BQU0sZUFBZSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtRQUN2RCxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ2IsR0FBRyxFQUFFLFdBQVcsZUFBZSxjQUFjLFdBQVcsYUFBYSxRQUFRLGdCQUFnQixXQUFXLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO1NBQzVILENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FDRixDQUFBO0FBQ0gsQ0FBQyJ9