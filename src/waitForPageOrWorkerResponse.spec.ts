import { test, expect } from '@lcrespilho/playwright-fixtures'
import { flatWorkerResponseUrl, waitForPageOrWorkerResponse } from './waitForPageOrWorkerResponse'
import { initWorkerCDPSession, type WorkerResponse, type WorkerRequest } from './workerCDPSession'
import { flatResponseUrl, type ResponseLike } from './flatResponseUrl'
import { flatRequestUrl, type RequestLike } from './flatRequestUrl'
import type { Response, Request } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  const client = await initWorkerCDPSession(page)
  await client.send('Network.enable')
  await client.send('Network.setCacheDisabled', { cacheDisabled: true })
})

test('waitForPageOrWorkerResponse', async ({ page }) => {
  await page.waitForTimeout(1000)
  const [_, resWorker, resPage] = await Promise.all([
    page.goto('https://lcrespilho.com/deletar.html', { waitUntil: 'networkidle' }),
    waitForPageOrWorkerResponse(page, 'source=serviceworker', { timeout: 4000 }),
    waitForPageOrWorkerResponse(page, 'source=page', { timeout: 4000 }),
  ])

  console.log(flatResponseUrl(resWorker))
  console.log(flatResponseUrl(resPage))

  expect(flatWorkerResponseUrl(resWorker as WorkerResponse)).toBe(
    'https://jsonplaceholder.typicode.com/posts?fromserviceworker&source=serviceworker',
  )
  expect(flatWorkerResponseUrl(resWorker as WorkerResponse)).toBe(
    'https://jsonplaceholder.typicode.com/posts?fromserviceworker&source=serviceworker',
  )
})

// test.afterEach(async ({ page }) => await page.close())

function logResponse(res) {}
