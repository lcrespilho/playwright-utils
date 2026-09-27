import { flatRequestUrl } from './flatRequestUrl'
import type { Response } from '@playwright/test'

/**
 * Returns a flattened request URL from Response object, by combining the URL and postData
 * parameters of the given Response's Request object.
 *
 * @param {Response} res A Response object
 * @return {*}  {string} A string representing the flattened request URL.
 */
export const flatResponseUrl = (res: Response): string => flatRequestUrl(res.request())
