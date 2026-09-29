import { test, expect } from '@playwright/test'
import { flatRequestUrl, type RequestLike } from './flatRequestUrl'

test('flatRequestUrl', () => {
  const req: RequestLike = {
    url: () => 'https://example.com/path?query',
    postData: () => 'a=b',
  }

  expect(flatRequestUrl(req)).toEqual('https://example.com/path?query&a=b')
})
