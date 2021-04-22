import {NextFunction, Request, Response} from "express";

import supportedLanguages from '../lang'
import { LANGUAGE_DEFAULT, SUPPORTED_LANGUAGES } from "../config/server.config";
import { logger } from "../lib";

/**
 * Append messages for selected language based on browser preference
 *
 * Adds the messages onto the response object before they are injected into the index file sent to the browser
 *
 * @param request
 * @param response
 * @param next
 */
export default function localeMiddleware(request: Request, response: Response, next: NextFunction): void {
    response.locals.supportedLanguages = SUPPORTED_LANGUAGES;

    const requestedLanguage = request.headers['accept-language']
    if (!requestedLanguage) {
        response.locals.locale = LANGUAGE_DEFAULT
        response.locals.localeMessages = supportedLanguages.find((language) => language.meta.localeCode === LANGUAGE_DEFAULT)

        return void next()
    }

    const [languageCode] = requestedLanguage.split(',')
    const languageSupported = supportedLanguages.find(({ code }) => code === languageCode)

    if(!languageSupported) {
        logger.info(`Client requested language for ${requestedLanguage} but it is not supported. Defaulting to ${LANGUAGE_DEFAULT}`)
    }

    const languageToUse = languageSupported || supportedLanguages.find((language) => language.meta.localeCode === LANGUAGE_DEFAULT)

    response.locals.localeMessages = languageToUse!.messages
    response.locals.locale = languageCode

    next()
}