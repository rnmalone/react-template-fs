import React from 'react';
import '../styles/LanguageSelector.scss';
import Flag from "../../Flag/Flag";
import { ILanguageMeta } from "../../../../types/lang";

interface ILanguageSelector {
    supportedLanguages: ILanguageMeta[]

    onToggleLanguage(localCode: string): () => void;
}

/**
 * UI Component to toggle the language code of the messages in the app
 *
 * @param supportedLanguages
 * @param onToggleLanguage
 * @constructor
 */
export default function LanguageSelector({ supportedLanguages, onToggleLanguage }: ILanguageSelector) {

    return (
        <div className="LanguageSelector">
            {
                supportedLanguages.map((lang: ILanguageMeta) => (
                    <div key={ `lang-${ lang.countryCode }` } onClick={ onToggleLanguage(lang.localeCode) }>
                        <Flag
                            countryCode={ lang.countryCode }
                        />
                    </div>
                ))
            }
        </div>
    )
}