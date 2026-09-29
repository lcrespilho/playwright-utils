import { previewGTM } from './previewGTM'
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ context }) => {
  await previewGTM(
    context,
    'https://tagassistant.google.com/?hl=en&utm_source=gtm#/?source=TAG_MANAGER&id=GTM-WRKNVS&canonical_id=2289496&gtm_auth=7iKIiPB5CTFZKhy1pUR9XQ&gtm_preview=env-4679&cb=5867270239726247',
  )
})

test('previewGTM retorna a versão de preview', async ({ page }) => {
  const responsePromise = page.waitForResponse(response => {
    const url = new URL(response.url())
    return url.pathname === '/gtm.js' && url.searchParams.get('id') === 'GTM-WRKNVS'
  })

  // Adiciona em about:blank mesmo. Funciona!
  await page.addScriptTag({
    url: 'https://www.googletagmanager.com/gtm.js?id=GTM-WRKNVS',
  })

  const response = await responsePromise

  expect(response.ok()).toBe(true)
  expect(await response.text()).toContain('"version":"QUICK_PREVIEW"')
})
