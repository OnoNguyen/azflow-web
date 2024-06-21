import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
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

export const isLoggedInVar = makeVar<boolean>(
  !!localStorage.getItem("isLoggedIn"),
);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
  resolvers: {
    Mutation: {
      toggleLoggedIn: (_, { status }) => {
        isLoggedInVar(status);
        if (status) {
          localStorage.setItem("isLoggedIn", "true");
        } else {
          localStorage.removeItem("isLoggedIn");
        }
        return status;
      },
    },
  },
  link: linkChain,
  connectToDevTools: true,
});

// @ts-ignore
const ApolloAppProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloAppProvider;
