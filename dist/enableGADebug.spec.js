"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const enableGADebug_1 = require("./enableGADebug");
(0, test_1.test)('enableGADebug rewrites gtag requests and adds the debug cookie', async () => {
    let routeMatcher;
    let routeCallback;
    let cookies = [];
    const context = {
        route: async (matcher, callback) => {
            routeMatcher = matcher;
            routeCallback = callback;
        },
        addCookies: async (values) => {
            cookies = values;
        },
    };
    await (0, enableGADebug_1.enableGADebug)(context);
    (0, test_1.expect)(routeMatcher).toBeInstanceOf(RegExp);
    (0, test_1.expect)(routeMatcher.test('https://www.google-analytics.com/gtag/js?id=G-TEST')).toBe(true);
    (0, test_1.expect)(routeMatcher.test('https://www.google-analytics.com/gtag/js?id=G-TEST&dbg=1')).toBe(false);
    (0, test_1.expect)(cookies).toContainEqual({
        name: 'gtm_debug',
        value: 'LOG=x',
        url: 'https://www.googletagmanager.com/',
        sameSite: 'None',
        secure: true,
    });
    let continuedUrl = '';
    await routeCallback({
        continue: async ({ url }) => {
            continuedUrl = url;
        },
    }, {
        url: () => 'https://www.google-analytics.com/gtag/js?id=G-TEST',
    });
    const rewrittenUrl = new URL(continuedUrl);
    (0, test_1.expect)(rewrittenUrl.hostname).toBe('www.googletagmanager.com');
    (0, test_1.expect)(rewrittenUrl.pathname).toBe('/gtag/js');
    (0, test_1.expect)(rewrittenUrl.searchParams.get('id')).toBe('G-TEST');
    (0, test_1.expect)(rewrittenUrl.searchParams.get('dbg')).toBe('1');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5hYmxlR0FEZWJ1Zy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuYWJsZUdBRGVidWcuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUErQztBQUUvQyxtREFBK0M7QUFJL0MsSUFBQSxXQUFJLEVBQUMsZ0VBQWdFLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakYsSUFBSSxZQUFnQyxDQUFBO0lBQ3BDLElBQUksYUFBd0MsQ0FBQTtJQUM1QyxJQUFJLE9BQU8sR0FBYyxFQUFFLENBQUE7SUFFM0IsTUFBTSxPQUFPLEdBQUc7UUFDZixLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQWUsRUFBRSxRQUF1QixFQUFFLEVBQUU7WUFDekQsWUFBWSxHQUFHLE9BQU8sQ0FBQTtZQUN0QixhQUFhLEdBQUcsUUFBUSxDQUFBO1FBQ3pCLENBQUM7UUFDRCxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQWlCLEVBQUUsRUFBRTtZQUN2QyxPQUFPLEdBQUcsTUFBTSxDQUFBO1FBQ2pCLENBQUM7S0FDNEIsQ0FBQTtJQUU5QixNQUFNLElBQUEsNkJBQWEsRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUU1QixJQUFBLGFBQU0sRUFBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDM0MsSUFBQSxhQUFNLEVBQUMsWUFBYSxDQUFDLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzNGLElBQUEsYUFBTSxFQUFDLFlBQWEsQ0FBQyxJQUFJLENBQUMsMERBQTBELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNsRyxJQUFBLGFBQU0sRUFBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUM7UUFDOUIsSUFBSSxFQUFFLFdBQVc7UUFDakIsS0FBSyxFQUFFLE9BQU87UUFDZCxHQUFHLEVBQUUsbUNBQW1DO1FBQ3hDLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLE1BQU0sRUFBRSxJQUFJO0tBQ1osQ0FBQyxDQUFBO0lBRUYsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLE1BQU0sYUFBYyxDQUNuQjtRQUNDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQW9CLEVBQUUsRUFBRTtZQUM3QyxZQUFZLEdBQUcsR0FBSSxDQUFBO1FBQ3BCLENBQUM7S0FDbUIsRUFDckI7UUFDQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsb0RBQW9EO0tBQ3pDLENBQ3ZCLENBQUE7SUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUMxQyxJQUFBLGFBQU0sRUFBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFDOUQsSUFBQSxhQUFNLEVBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM5QyxJQUFBLGFBQU0sRUFBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxJQUFBLGFBQU0sRUFBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN2RCxDQUFDLENBQUMsQ0FBQSJ9