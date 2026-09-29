import { expect, test } from '@playwright/test'
import type { BrowserContext, Request, Route } from '@playwright/test'
import { enableGADebug } from './enableGADebug'

test('enableGADebug carrega o gtag e registra comandos de debug', async ({ page, context }) => {
  await enableGADebug(context)

  const consoleMessages: string[] = []
  page.on('console', message => consoleMessages.push(message.text()))

  const measurementId = 'G-7B5F8LCQTR'
  const scriptResponsePromise = page.waitForResponse(response => {
    const url = new URL(response.url())
    return url.pathname === '/gtag/js' && url.searchParams.get('id') === measurementId
  })

  await page.setContent(`
    <!doctype html>
    <html>
      <head>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${measurementId}');
          gtag('event', 'playwright_test');
        </script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
      </head>
      <body></body>
    </html>
  `)

  const scriptResponse = await scriptResponsePromise
  expect(scriptResponse.ok()).toBe(true)
  expect(new URL(scriptResponse.url()).searchParams.get('dbg')).toBe('1')

  await expect.poll(() => consoleMessages.join('\n')).toContain('Processing data layer push')
})
