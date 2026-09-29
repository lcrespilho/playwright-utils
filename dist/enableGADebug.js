"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableGADebug = enableGADebug;
/**
 * Simula a extensão Google Analytics Debugger (https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna),
 * habilitando debug GA4 (gtag).
 */
async function enableGADebug(context) {
    await context.route(/\/gtag\/(js|destination)(?!.*dbg=1)/, async (route, request) => {
        const url = new URL(request.url());
        url.searchParams.set('dbg', '1');
        url.hostname = 'www.googletagmanager.com';
        route.continue({ url: url.href });
    });
    // Debug de gtag
    await context.addCookies([
        {
            name: 'gtm_debug',
            value: 'LOG=x',
            url: 'https://www.googletagmanager.com/',
            sameSite: 'None',
            secure: true,
        },
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5hYmxlR0FEZWJ1Zy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmFibGVHQURlYnVnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOzs7R0FHRztBQUNJLEtBQUssd0JBQXdCLE9BQXVCO0lBQ3pELE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQ2xGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ2xDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNoQyxHQUFHLENBQUMsUUFBUSxHQUFHLDBCQUEwQixDQUFBO1FBQ3pDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDbkMsQ0FBQyxDQUFDLENBQUE7SUFFRixnQkFBZ0I7SUFDaEIsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3ZCO1lBQ0UsSUFBSSxFQUFFLFdBQVc7WUFDakIsS0FBSyxFQUFFLE9BQU87WUFDZCxHQUFHLEVBQUUsbUNBQW1DO1lBQ3hDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE1BQU0sRUFBRSxJQUFJO1NBQ2I7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDIn0=