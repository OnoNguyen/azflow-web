import React from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8080/api', // Replace with your GraphQL API endpoint
    cache: new InMemoryCache(),
});
// @ts-ignore
const ApolloAppProvider = ({children}) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloAppProvider;