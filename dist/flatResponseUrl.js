"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatResponseUrl = void 0;
const flatRequestUrl_1 = require("./flatRequestUrl");
/**
 * Returns a flattened request URL from Response object, by combining the URL and postData
 * parameters of the given Response's Request object.
 */
const flatResponseUrl = (res) => (0, flatRequestUrl_1.flatRequestUrl)(res.request());
exports.flatResponseUrl = flatResponseUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdFJlc3BvbnNlVXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ZsYXRSZXNwb25zZVVybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBbUU7QUFNbkU7OztHQUdHO0FBQ0ksTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFpQixFQUFVLEVBQUUsQ0FBQyxJQUFBLCtCQUFjLEVBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFBOUUsUUFBQSxlQUFlLEdBQWYsZUFBZSxDQUErRCJ9