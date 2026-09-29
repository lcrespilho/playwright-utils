import { type RequestLike } from './flatRequestUrl';
export type ResponseLike = {
    request: () => RequestLike;
};
/**
 * Returns a flattened request URL from Response object, by combining the URL and postData
 * parameters of the given Response's Request object.
 */
export declare const flatResponseUrl: (res: ResponseLike) => string;
