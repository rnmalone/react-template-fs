import { ILanguageMeta, LocaleMessages } from "../../types";

export type LanguageConfig = {
    meta: ILanguageMeta;
    messages: LocaleMessages
}

export default class Language {

    meta: ILanguageMeta;
    messages: LocaleMessages

    constructor({ meta, messages }: LanguageConfig) {
        this.meta = meta
        this.messages = messages
    }

    get configuredMessages(): string[] {
        return Object.keys(this.messages)
    }

    get code(): string {
        return this.meta.localeCode
    }
}