import { test, expect } from '@playwright/test'
import { flatResponseUrl, type ResponseLike } from './flatResponseUrl'
import { type RequestLike } from './flatRequestUrl'

test('flatResponseUrl', () => {
  const req: RequestLike = {
    url: () => 'https://example.com/path?query',
    postData: () => 'a=b',
  }

  const res: ResponseLike = {
    request: () => req,
  }

  expect(flatResponseUrl(res)).toEqual('https://example.com/path?query&a=b')
})
