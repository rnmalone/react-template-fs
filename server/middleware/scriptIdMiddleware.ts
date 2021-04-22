import { NextFunction, Response, Request } from "express";

/**
 * Set the request id in response.locals so we can add it to the static files
 *
 * We set the id as a nonce on static files for the CSP to verify the static files are legitimate
 *
 * @param id
 */
export default function scriptIdMiddleware(id: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        res.locals.scriptId = id

        next();
    }
}