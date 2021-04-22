import { ILanguageMeta } from "../../types";

export const BASE_CSP_HEADERS = {
    defaultSrc: '\'self\'',
    blockAllMixedContent: '',
    fontSrc: '\'self\'',
    frameAncestors: '\'self\'',
    imgSrc: '\'self\'',
    objectSrc: '\'none\'',
    scriptSrc: '\'self\'',
    scriptSrcAttr: '\'none\'',
    styleSrcElem: '\'unsafe-inline\'',
    upgradeInsecureRequests: ''
}

export const __DEV__ = process.env.NODE_ENV === 'dev'

export const {
    _CACHE_AGE = 86400
} = process.env

export const CACHE_AGE = Number(_CACHE_AGE)

export const LANGUAGE_DEFAULT: ILanguageMeta['localeCode'] = 'en-GB';
export const SUPPORTED_LANGUAGES: ILanguageMeta['localeCode'][] = ['en-GB', 'es']