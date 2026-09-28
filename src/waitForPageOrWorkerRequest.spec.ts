import { test, expect } from '@lcrespilho/playwright-fixtures'
import { flatWorkerRequestUrl, waitForPageOrWorkerRequest } from './waitForPageOrWorkerRequest'
import { initWorkerCDPSession, type WorkerResponse, type WorkerRequest } from './workerCDPSession'
import { flatRequestUrl, type RequestLike } from './flatRequestUrl'
import type { Request } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  const client = await initWorkerCDPSession(page)
  await client.send('Network.enable')
  await client.send('Network.setCacheDisabled', { cacheDisabled: true })
})

test('waitForPageOrWorkerRequest', async ({ page }) => {
  await page.waitForTimeout(1000)
  const [_, reqWorker, reqPage] = await Promise.all([
    page.goto('https://lcrespilho.com/deletar.html', { waitUntil: 'networkidle' }),
    waitForPageOrWorkerRequest(page, 'source=serviceworker', { timeout: 4000 }),
    waitForPageOrWorkerRequest(page, 'source=page', { timeout: 4000 }),
  ])

  // console.log(flatRequestUrl(reqWorker))
  // console.log(flatRequestUrl(reqPage))

  expect(flatWorkerRequestUrl(reqWorker as WorkerRequest)).toBe(
    'https://jsonplaceholder.typicode.com/posts?fromserviceworker&source=serviceworker',
  )
  expect(flatWorkerRequestUrl(reqWorker as WorkerRequest)).toBe(
    'https://jsonplaceholder.typicode.com/posts?fromserviceworker&source=serviceworker',
  )
})

// test.afterEach(async ({ page }) => await page.close())
