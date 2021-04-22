import enGB from "./en-GB";
import es from './es'
import { SUPPORTED_LANGUAGES } from "../config/server.config";
import Language from "../lib/Language";
import isEqual from 'lodash.isequal';
import { logger } from "../lib";

const languages = [
    enGB,
    es
]

const supportedLanguages = SUPPORTED_LANGUAGES.map((localeCode) => {
    const language = languages.find((lang) => lang.meta.localeCode === localeCode)

    if(!language) {
        throw new Error(`Missing configured language for ${localeCode}`)
    }

    return new Language(language);
})

const completeLanguages = supportedLanguages.reduce((complete: Language[], language: Language) => {
    if(!complete.length) {
       return [language]
    }

    if(!complete.every((completeLanguage) => isEqual(completeLanguage.configuredMessages, language.configuredMessages))) {
        if(language.configuredMessages.length > complete[0].configuredMessages.length) {
            logger.error(`Languages files ${JSON.stringify(complete.map(({ meta }) => meta.localeCode ))} are missing keys!`)
        }

        logger.error(`Language file for ${language.meta.countryCode} is missing message keys!`)
    }

    return [...complete, language];
}, [])


export default completeLanguages;