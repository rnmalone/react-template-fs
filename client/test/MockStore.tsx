import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { INITIAL_APP_STATE } from "../modules";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const mockAppStore = mockStore(INITIAL_APP_STATE);

export default function MockStore({ children, store: storeOverride = mockAppStore }: any) {
    return <Provider store={ storeOverride }>{ children }</Provider>
}