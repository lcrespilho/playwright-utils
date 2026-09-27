"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatRequestUrl = void 0;
/**
 * Returns a flattened request URL by combining the URL and postData parameters of the given Request-like object.
 *
 * @param {RequestLike} req The Request-like object containing the URL and postData
 * @return {*}  {string} A string representing the flattened request URL
 */
const flatRequestUrl = (req) => {
    const url = typeof req.url === 'function' ? req.url() : req.url;
    const body = typeof req.postData === 'function' ? (req.postData() ?? '') : (req.postData ?? '');
    if (!body)
        return url;
    const flatUrl = `${url}${url.includes('?') ? '&' : '?'}${body}`;
    return flatUrl
        .replace(/\r\n|\n|\r/g, '&')
        .replace(/&&/g, '&')
        .replace(/&$/g, '');
};
exports.flatRequestUrl = flatRequestUrl;
//# sourceMappingURL=flatRequestUrl.js.map