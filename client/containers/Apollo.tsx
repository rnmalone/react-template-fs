import React, { ReactChild } from "react";
import {apiBaseUri} from '../config/client.config';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

export default function Apollo({children}: { children: ReactChild | ReactChild[] }) {
    const apolloClient = new ApolloClient({
        uri: apiBaseUri,
        cache: new InMemoryCache()
    })

    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    )
}
