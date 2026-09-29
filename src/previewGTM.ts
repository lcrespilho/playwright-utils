import type { Page, BrowserContext } from '@playwright/test'

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
export async function previewGTM(pageOrContext: Page | BrowserContext, tagAssistantUrl: string) {
  let taUrl = new URL(tagAssistantUrl.replace(/^(https:\/\/[^/?#]+)\/(?:\?[^#]*)?#\/\?(.*)$/, '$1/?$2'))
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
    },
  )
}
