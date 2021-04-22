import {ActionHandler, Dispatch, IAction} from "../../types/store";

enum CounterActionTypes {
    SET_COUNTER = 'app/modules/locale/SET_COUNTER'
}

export function setValue(newValue: number) {
    return (dispatch: Dispatch<CounterActionTypes.SET_COUNTER>) => {
        dispatch({ type: CounterActionTypes.SET_COUNTER, payload: newValue })
    }
}

export interface ICounterState {
   value: number
}

export const COUNTER_INITIAL_STATE = {
    value: 0
}

const actionHandlers: ActionHandler<CounterActionTypes, ICounterState> = {
    [CounterActionTypes.SET_COUNTER]: (state: ICounterState, action: IAction<CounterActionTypes>) => ({
        ...state,
       value: action.payload
    })
}

export default function reducer(state: ICounterState = COUNTER_INITIAL_STATE, action: IAction<CounterActionTypes>) {
    const handler = actionHandlers[action.type]

    return handler ? handler(state, action) : state;
}
