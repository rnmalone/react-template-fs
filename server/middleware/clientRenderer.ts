import { Request, Response } from 'express';
import { __DEV__ } from "../config/server.config";
const config = require('../../config/project.config')

/**
 * Injects data into the index file sent to the browser.
 *
 * (Once the client files are built they cannot access any dynamic config values, so we can add them to the html file)
 *
 * @param request
 * @param response
 */
export default function clientRenderer(request: Request, response: Response) {

    const BASE_CLIENT_CONFIG = {
        apiBaseUri: config.server.apiBaseUri,
        localeUrl: config.server.localeUrl,
        __DEV__
    }

    // Serves the index file with the data object
    // The pug view engine will create a HTML file before its sent to the browser
    response.render('index', {
        scriptId: response.locals.scriptId,
        metaDescription: config.client.metaDescription,
        initialClientState: JSON.stringify({
            locale: response.locals.locale,
            localeMessages: response.locals.localeMessages,
            supportedLanguages: response.locals.supportedLanguages,
            ...BASE_CLIENT_CONFIG
        })
    })
}
