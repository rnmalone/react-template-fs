import { Request, Response } from 'express';

/**
 * Health endpoint
 *
 * It is conventional for servers to publish their service health so that any services that
 * depend on them can check
 *
 * @param request
 * @param response
 */
export default async function health(request: Request, response: Response) {

    /**
     * Your business logic here for determining service health
     *
     */
    response.header('Content-Type', 'application/json')
    response.send({
        status: 'I am OK!'
    }).end()
}