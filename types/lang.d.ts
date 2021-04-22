export interface ILanguageMeta {
    language: string;
    countryCode: string;
    localeCode: string;
}
export type LocaleMessages = Record<string, string>

export type LanguageData = {
    meta: ILanguageMeta,
    messages: {
        [key: string]: string
    }
}