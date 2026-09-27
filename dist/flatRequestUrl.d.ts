type RequestLike = {
    url: (() => string) | string;
    postData?: (() => string | null) | string;
};
/**
 * Returns a flattened request URL by combining the URL and postData parameters of the given Request-like object.
 *
 * @param {RequestLike} req The Request-like object containing the URL and postData
 * @return {*}  {string} A string representing the flattened request URL
 */
export declare const flatRequestUrl: (req: RequestLike) => string;
export {};
