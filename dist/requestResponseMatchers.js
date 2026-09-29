"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMatcherCb = exports.requestMatcherCb = exports.responseMatcher = exports.requestMatcher = void 0;
const flatRequestUrl_1 = require("./flatRequestUrl");
const flatResponseUrl_1 = require("./flatResponseUrl");
/**
 * Cria um predicado que verifica se a URL achatada da requisição corresponde ao padrão.
 * @example
 * ```ts
 * const request = await page.waitForRequest(requestMatcher('/api/users'))
 * ```
 */
const requestMatcher = (pattern) => (req) => typeof pattern === 'string' ? (0, flatRequestUrl_1.flatRequestUrl)(req).includes(pattern) : pattern.test((0, flatRequestUrl_1.flatRequestUrl)(req));
exports.requestMatcher = requestMatcher;
/**
 * Cria um predicado que verifica se a URL achatada da resposta corresponde ao padrão.
 * @example
 * ```ts
 * const response = await page.waitForResponse(responseMatcher('/api/users'))
 * ```
 */
const responseMatcher = (pattern) => (res) => typeof pattern === 'string' ? (0, flatResponseUrl_1.flatResponseUrl)(res).includes(pattern) : pattern.test((0, flatResponseUrl_1.flatResponseUrl)(res));
exports.responseMatcher = responseMatcher;
/**
 * Cria um predicado que, ao encontrar uma requisição correspondente, executa o callback
 * e retorna `true`. Erros lançados pelo callback são ignorados.
 * @example
 * ```ts
 * await page.waitForRequest(
 *   requestMatcherCb('/api/users', req => console.log(req.method()))
 * )
 * ```
 */
const requestMatcherCb = (pattern, cb) => (req) => {
    if ((0, exports.requestMatcher)(pattern)(req)) {
        try {
            cb(req);
        }
        catch (e) { }
        return true;
    }
    else {
        return false;
    }
};
exports.requestMatcherCb = requestMatcherCb;
/**
 * Cria um predicado que, ao encontrar uma resposta correspondente, executa o callback
 * e retorna `true`. Erros lançados pelo callback são ignorados.
 * @example
 * ```ts
 * await page.waitForResponse(
 *   responseMatcherCb('/api/users', res => console.log(res.status()))
 * )
 * ```
 */
const responseMatcherCb = (pattern, cb) => (res) => {
    if ((0, exports.responseMatcher)(pattern)(res)) {
        try {
            cb(res);
        }
        catch (e) { }
        return true;
    }
    else {
        return false;
    }
};
exports.responseMatcherCb = responseMatcherCb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdFJlc3BvbnNlTWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVxdWVzdFJlc3BvbnNlTWF0Y2hlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQThEO0FBQzlELHVEQUFpRTtBQUVqRTs7Ozs7O0dBTUc7QUFDSSxNQUFNLGNBQWMsR0FBRyxDQUFDLE9BQXdCLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBZ0IsRUFBRSxFQUFFLENBQy9FLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBQSwrQkFBYyxFQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFBLCtCQUFjLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUQ1RixRQUFBLGNBQWMsR0FBZCxjQUFjLENBQzhFO0FBRXpHOzs7Ozs7R0FNRztBQUNJLE1BQU0sZUFBZSxHQUFHLENBQUMsT0FBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFpQixFQUFFLEVBQUUsQ0FDakYsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFBLGlDQUFlLEVBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUEsaUNBQWUsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBRDlGLFFBQUEsZUFBZSxHQUFmLGVBQWUsQ0FDK0U7QUFFM0c7Ozs7Ozs7OztHQVNHO0FBQ0ksTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE9BQXdCLEVBQUUsRUFBOEIsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFnQixFQUFFLEVBQUU7SUFDakgsSUFBSSxJQUFBLFFBQUEsY0FBYyxFQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDO1lBQ0gsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDO1FBQ2QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQTtBQVRZLFFBQUEsZ0JBQWdCLEdBQWhCLGdCQUFnQixDQVM1QjtBQUVEOzs7Ozs7Ozs7R0FTRztBQUNJLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxPQUF3QixFQUFFLEVBQStCLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBaUIsRUFBRSxFQUFFO0lBQ3BILElBQUksSUFBQSxRQUFBLGVBQWUsRUFBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQztZQUNILEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNULENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQztRQUNkLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7QUFDSCxDQUFDLENBQUE7QUFUWSxRQUFBLGlCQUFpQixHQUFqQixpQkFBaUIsQ0FTN0IifQ==