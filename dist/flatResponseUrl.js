"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatResponseUrl = void 0;
const flatRequestUrl_1 = require("./flatRequestUrl");
/**
 * Returns a flattened request URL from Response object, by combining the URL and postData
 * parameters of the given Response's Request object.
 *
 * @param {Response} res A Response object
 * @return {*}  {string} A string representing the flattened request URL.
 */
const flatResponseUrl = (res) => (0, flatRequestUrl_1.flatRequestUrl)(res.request());
exports.flatResponseUrl = flatResponseUrl;
//# sourceMappingURL=flatResponseUrl.js.map