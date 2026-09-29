import { test, expect } from '@playwright/test'
import type { RequestLike } from './flatRequestUrl'
import type { ResponseLike } from './flatResponseUrl'
import { requestMatcher, requestMatcherCb, responseMatcher, responseMatcherCb } from './requestResponseMatchers'

const request: RequestLike = {
  url: () => 'https://example.com/api/users?search=ada',
  postData: () => 'role=admin',
}

const response: ResponseLike = {
  request: () => request,
}

test('requestMatcher matches flattened request URLs using strings and regular expressions', () => {
  expect(requestMatcher('role=admin')(request)).toBe(true)
  expect(requestMatcher('/api/posts')(request)).toBe(false)
  expect(requestMatcher(/api\/users\?search=ada&role=admin/)(request)).toBe(true)
})

test('responseMatcher matches flattened response URLs using strings and regular expressions', () => {
  expect(responseMatcher('role=admin')(response)).toBe(true)
  expect(responseMatcher('/api/posts')(response)).toBe(false)
  expect(responseMatcher(/api\/users\?search=ada&role=admin/)(response)).toBe(true)
})

test('requestMatcherCb calls the callback only when the request matches', () => {
  let receivedRequest: RequestLike | undefined

  expect(requestMatcherCb('role=admin', matchedRequest => (receivedRequest = matchedRequest))(request)).toBe(true)
  expect(receivedRequest).toBe(request)

  receivedRequest = undefined
  expect(requestMatcherCb('/api/posts', matchedRequest => (receivedRequest = matchedRequest))(request)).toBe(false)
  expect(receivedRequest).toBeUndefined()
})

test('responseMatcherCb calls the callback only when the response matches', () => {
  let receivedResponse: ResponseLike | undefined

  expect(responseMatcherCb('role=admin', matchedResponse => (receivedResponse = matchedResponse))(response)).toBe(true)
  expect(receivedResponse).toBe(response)

  receivedResponse = undefined
  expect(responseMatcherCb('/api/posts', matchedResponse => (receivedResponse = matchedResponse))(response)).toBe(false)
  expect(receivedResponse).toBeUndefined()
})

test('callback matchers ignore errors thrown by callbacks', () => {
  expect(
    requestMatcherCb('role=admin', () => {
      throw new Error('callback error')
    })(request),
  ).toBe(true)
  expect(
    requestMatcherCb('/api/posts', () => {
      throw new Error('callback error')
    })(request),
  ).toBe(false)
  expect(
    responseMatcherCb('role=admin', () => {
      throw new Error('callback error')
    })(response),
  ).toBe(true)
  expect(
    responseMatcherCb('/api/posts', () => {
      throw new Error('callback error')
    })(response),
  ).toBe(false)
})
