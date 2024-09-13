import { ReactNode, useMemo } from "react";
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

const ApolloAppProvider = ({ children }: { children: ReactNode }) => {
  const { idToken, loading } = useAuth();

  const client = useMemo(() => {
    console.log("Creating Apollo client", import.meta.env.VITE_API_URL); // This should only log once per auth state change

    const httpLink = createHttpLink({
      uri: `${import.meta.env.VITE_API_URL}/gql`,
    });

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: idToken ?? "",
      },
    }));

    const linkChain = authLink.concat(
      createPersistedQueryLink({
        sha256,
        useGETForHashedQueries: true,
      }).concat(httpLink),
    );

    return new ApolloClient({
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
  }, [idToken]); // Only recreate client when idToken changes

  if (loading) {
    return <Loader />;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloAppProvider;
