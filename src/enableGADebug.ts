import type { BrowserContext } from '@playwright/test'

/**
 * Simula a extensão Google Analytics Debugger (https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna),
 * habilitando debug GA4 (gtag).
 */
export async function enableGADebug(context: BrowserContext) {
  await context.route(/\/gtag\/(js|destination)(?!.*dbg=1)/, async (route, request) => {
    const url = new URL(request.url())
    url.searchParams.set('dbg', '1')
    url.hostname = 'www.googletagmanager.com'
    route.continue({ url: url.href })
  })

  // Debug de gtag
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
