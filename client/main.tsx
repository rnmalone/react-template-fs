import '@babel/polyfill';
import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import {AppContainer as HotLoaderContainer} from 'react-hot-loader';
import {CoreLayout} from './layouts';
import Routes from './routes';
import {BrowserRouter} from "react-router-dom";
import createStore from './store/createStore';
import {Apollo, AppIntlProvider} from "./containers";
import ErrorBoundary from "./containers/ErrorBoundary";

import './styles/main.scss';

const MOUNT_NODE = document.getElementById('root');

const { localeMessages = {}, supportedLanguages = [] } = window?.__INITIAL_STATE__ || {}

const store = createStore({
    // We can set data in the global state on app mount
    locale: {
        localeMessages,
        supportedLanguages,
    }
})

ReactDOM.render(
    <HotLoaderContainer>
        <ErrorBoundary>
            <Provider store={store}>
                <AppIntlProvider>
                    <Apollo>
                        <BrowserRouter basename="/">
                            <CoreLayout>
                                <Routes/>
                            </CoreLayout>
                        </BrowserRouter>
                    </Apollo>
                </AppIntlProvider>
            </Provider>
        </ErrorBoundary>
    </HotLoaderContainer>,
    MOUNT_NODE
);

