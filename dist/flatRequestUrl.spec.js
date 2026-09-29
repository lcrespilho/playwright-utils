"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const flatRequestUrl_1 = require("./flatRequestUrl");
(0, test_1.test)('flatRequestUrl', () => {
    const req = {
        url: () => 'https://example.com/path?query',
        postData: () => 'a=b',
    };
    (0, test_1.expect)((0, flatRequestUrl_1.flatRequestUrl)(req)).toEqual('https://example.com/path?query&a=b');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdFJlcXVlc3RVcmwuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9mbGF0UmVxdWVzdFVybC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQStDO0FBQy9DLHFEQUFtRTtBQUVuRSxJQUFBLFdBQUksRUFBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7SUFDMUIsTUFBTSxHQUFHLEdBQWdCO1FBQ3ZCLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxnQ0FBZ0M7UUFDM0MsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUs7S0FDdEIsQ0FBQTtJQUVELElBQUEsYUFBTSxFQUFDLElBQUEsK0JBQWMsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO0FBQzNFLENBQUMsQ0FBQyxDQUFBIn0=