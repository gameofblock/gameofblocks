import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
} from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'cross-fetch';

const { GRAPHQL_SERVER_URI } = process.env;

let apolloClient = null;

function create(initialState): ApolloClient<NormalizedCacheObject> {
  const isBrowser = typeof window !== 'undefined';
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: createHttpLink({
      fetch: !isBrowser && fetch,
      uri: GRAPHQL_SERVER_URI,
      credentials: 'include',
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export function initApollo(initialState): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}

export default initApollo;
