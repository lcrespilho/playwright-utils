"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const requestResponseMatchers_1 = require("./requestResponseMatchers");
const request = {
    url: () => 'https://example.com/api/users?search=ada',
    postData: () => 'role=admin',
};
const response = {
    request: () => request,
};
(0, test_1.test)('requestMatcher matches flattened request URLs using strings and regular expressions', () => {
    (0, test_1.expect)((0, requestResponseMatchers_1.requestMatcher)('role=admin')(request)).toBe(true);
    (0, test_1.expect)((0, requestResponseMatchers_1.requestMatcher)('/api/posts')(request)).toBe(false);
    (0, test_1.expect)((0, requestResponseMatchers_1.requestMatcher)(/api\/users\?search=ada&role=admin/)(request)).toBe(true);
});
(0, test_1.test)('responseMatcher matches flattened response URLs using strings and regular expressions', () => {
    (0, test_1.expect)((0, requestResponseMatchers_1.responseMatcher)('role=admin')(response)).toBe(true);
    (0, test_1.expect)((0, requestResponseMatchers_1.responseMatcher)('/api/posts')(response)).toBe(false);
    (0, test_1.expect)((0, requestResponseMatchers_1.responseMatcher)(/api\/users\?search=ada&role=admin/)(response)).toBe(true);
});
(0, test_1.test)('requestMatcherCb calls the callback only when the request matches', () => {
    let receivedRequest;
    (0, test_1.expect)((0, requestResponseMatchers_1.requestMatcherCb)('role=admin', matchedRequest => (receivedRequest = matchedRequest))(request)).toBe(true);
    (0, test_1.expect)(receivedRequest).toBe(request);
    receivedRequest = undefined;
    (0, test_1.expect)((0, requestResponseMatchers_1.requestMatcherCb)('/api/posts', matchedRequest => (receivedRequest = matchedRequest))(request)).toBe(false);
    (0, test_1.expect)(receivedRequest).toBeUndefined();
});
(0, test_1.test)('responseMatcherCb calls the callback only when the response matches', () => {
    let receivedResponse;
    (0, test_1.expect)((0, requestResponseMatchers_1.responseMatcherCb)('role=admin', matchedResponse => (receivedResponse = matchedResponse))(response)).toBe(true);
    (0, test_1.expect)(receivedResponse).toBe(response);
    receivedResponse = undefined;
    (0, test_1.expect)((0, requestResponseMatchers_1.responseMatcherCb)('/api/posts', matchedResponse => (receivedResponse = matchedResponse))(response)).toBe(false);
    (0, test_1.expect)(receivedResponse).toBeUndefined();
});
(0, test_1.test)('callback matchers ignore errors thrown by callbacks', () => {
    (0, test_1.expect)((0, requestResponseMatchers_1.requestMatcherCb)('role=admin', () => {
        throw new Error('callback error');
    })(request)).toBe(true);
    (0, test_1.expect)((0, requestResponseMatchers_1.requestMatcherCb)('/api/posts', () => {
        throw new Error('callback error');
    })(request)).toBe(false);
    (0, test_1.expect)((0, requestResponseMatchers_1.responseMatcherCb)('role=admin', () => {
        throw new Error('callback error');
    })(response)).toBe(true);
    (0, test_1.expect)((0, requestResponseMatchers_1.responseMatcherCb)('/api/posts', () => {
        throw new Error('callback error');
    })(response)).toBe(false);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdFJlc3BvbnNlTWF0Y2hlcnMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0UmVzcG9uc2VNYXRjaGVycy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQStDO0FBRy9DLHVFQUFnSDtBQUVoSCxNQUFNLE9BQU8sR0FBZ0I7SUFDM0IsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLDBDQUEwQztJQUNyRCxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWTtDQUM3QixDQUFBO0FBRUQsTUFBTSxRQUFRLEdBQWlCO0lBQzdCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPO0NBQ3ZCLENBQUE7QUFFRCxJQUFBLFdBQUksRUFBQyxxRkFBcUYsRUFBRSxHQUFHLEVBQUU7SUFDL0YsSUFBQSxhQUFNLEVBQUMsSUFBQSx3Q0FBYyxFQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hELElBQUEsYUFBTSxFQUFDLElBQUEsd0NBQWMsRUFBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6RCxJQUFBLGFBQU0sRUFBQyxJQUFBLHdDQUFjLEVBQUMsbUNBQW1DLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNqRixDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUEsV0FBSSxFQUFDLHVGQUF1RixFQUFFLEdBQUcsRUFBRTtJQUNqRyxJQUFBLGFBQU0sRUFBQyxJQUFBLHlDQUFlLEVBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUQsSUFBQSxhQUFNLEVBQUMsSUFBQSx5Q0FBZSxFQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEs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