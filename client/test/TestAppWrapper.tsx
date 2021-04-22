import React from 'react';
import { AppIntlProvider } from "../containers";
import { MockedProvider } from "@apollo/client/testing";
import MockStore from "./MockStore";

export default function TestAppWrapper({ store, children, apolloMocks }: any) {
    return (
        <MockStore store={ store }>
            <AppIntlProvider>
                <MockedProvider mocks={ apolloMocks }>
                    { children }
                </MockedProvider>
            </AppIntlProvider>
        </MockStore>
    )
}