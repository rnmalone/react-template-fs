import locale, { ILocaleState, LOCALE_INITIAL_STATE } from './locale';
import counter, { ICounterState, COUNTER_INITIAL_STATE } from './counter';

export {default as locale} from './locale';

export const globalReducers = {
    locale,
    counter
}

export interface IAppState {
    locale: ILocaleState,
    counter: ICounterState
}

export const INITIAL_APP_STATE = {
    locale: LOCALE_INITIAL_STATE,
    counter: COUNTER_INITIAL_STATE
}