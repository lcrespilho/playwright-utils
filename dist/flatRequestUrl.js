"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatRequestUrl = void 0;
/**
 * Returns a flattened request URL by combining the URL and postData parameters of the given Request-like object.
 */
const flatRequestUrl = (req) => {
    const url = req.url();
    const body = req.postData();
    if (!body)
        return url;
    const flatUrl = `${url}${url.includes('?') ? '&' : '?'}${body}`;
    return flatUrl
        .replace(/\r\n|\n|\r/g, '&')
        .replace(/&&/g, '&')
        .replace(/&$/g, '');
};
exports.flatRequestUrl = flatRequestUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdFJlcXVlc3RVcmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmxhdFJlcXVlc3RVcmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0E7O0dBRUc7QUFDSSxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQWdCLEVBQVUsRUFBRTtJQUN6RCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDckIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQzNCLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxHQUFHLENBQUE7SUFDckIsTUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDL0QsT0FBTyxPQUFPO1NBQ1gsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUM7U0FDM0IsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7U0FDbkIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUN2QixDQUFDLENBQUE7QUFUWSxRQUFBLGNBQWMsR0FBZCxjQUFjLENBUzFCIn0=