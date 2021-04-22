import {logger} from "../lib";
import {Request, Response} from 'express'
import languages from "../lang";

/**
 * Returns the messages for the requested locale code
 *
 * @param request
 * @param response
 */
export default async function locale(request: Request, response: Response) {
    const {localeCode} = request.query

    const supportedLocale = languages.find(({ code }) => code === localeCode)

    if (supportedLocale) {
        logger.info(`Sending messages for requested language: ${localeCode}`)

        return void response.send({
            localeMessages: supportedLocale.messages,
            localeCode
        })
    }

    logger.info(`Received request for unsupported language: ${localeCode}`)

    return response.sendStatus(404)
}