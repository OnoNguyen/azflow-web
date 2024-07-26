import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";
import { useAuth } from "@/auth/useAuth.tsx";
import { Loader } from "@/component/Loader";
import { ReactNode } from "react";

const authLink = (token: string) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ?? "",
      },
    };
  });
};

const ApolloAppProvider = ({ children }: { children: ReactNode }) => {
  const { idToken, loading } = useAuth();

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL,
  });

  const linkChain = authLink(idToken).concat(
    createPersistedQueryLink({
      sha256,
      useGETForHashedQueries: true,
    }).concat(httpLink),
  );

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {},
        },
      },
    }),
    resolvers: {
      Mutation: {},
    },
    link: linkChain,
    connectToDevTools: true,
  });

  return loading ? (
    <Loader />
  ) : (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );
};

export default ApolloAppProvider;
