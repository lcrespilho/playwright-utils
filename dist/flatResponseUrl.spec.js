"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const flatResponseUrl_1 = require("./flatResponseUrl");
(0, test_1.test)('flatResponseUrl', () => {
    const req = {
        url: () => 'https://example.com/path?query',
        postData: () => 'a=b',
    };
    const res = {
        request: () => req,
    };
    (0, test_1.expect)((0, flatResponseUrl_1.flatResponseUrl)(res)).toEqual('https://example.com/path?query&a=b');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdFJlc3BvbnNlVXJsLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmxhdFJlc3BvbnNlVXJsLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBK0M7QUFDL0MsdURBQXNFO0FBR3RFLElBQUEsV0FBSSxFQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtJQUMzQixNQUFNLEdBQUcsR0FBZ0I7UUFDdkIsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLGdDQUFnQztRQUMzQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSztLQUN0QixDQUFBO0lBRUQsTUFBTSxHQUFHLEdBQWlCO1FBQ3hCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO0tBQ25CLENBQUE7SUFFRCxJQUFBLGFBQU0sRUFBQyxJQUFBLGlDQUFlLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FBQTtBQUM1RSxDQUFDLENBQUMsQ0FBQSJ9