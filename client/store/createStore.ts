import {applyMiddleware, compose, createStore as creatReduxStore} from 'redux'
import thunk from 'redux-thunk';
import createReducers from "./reducers";
import { __DEV__ } from "../config/client.config";

export default function createStore(initialState = {}) {
    const middlewares = [thunk]
    let composeEnhancers = compose;

    if (__DEV__) {
        // Redux dev tools chrome extension lets you view the contents of your redux state
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    }

    return creatReduxStore(
        createReducers(),
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    )
}
