import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache,} from "@apollo/client";
import {createPersistedQueryLink} from "@apollo/client/link/persisted-queries";
import {sha256} from "crypto-hash";
import {setContext} from "@apollo/client/link/context";

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            authorization: token,
        },
    };
});

const linkChain = createPersistedQueryLink({
    sha256,
    useGETForHashedQueries: true,
})
    .concat(
        createHttpLink({
            uri: import.meta.env.VITE_API_URL,
        }),
    )
    .concat(authLink);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    resolvers: {},
    link: linkChain,
    connectToDevTools: true,
});

// @ts-ignore
const ApolloAppProvider = ({children}) => {
    console.log("api url", import.meta.env.VITE_API_URL);
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloAppProvider;
