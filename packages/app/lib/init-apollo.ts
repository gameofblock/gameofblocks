import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
} from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { InitApolloOptions } from 'next-with-apollo';

const { GRAPHQL_SERVER_URI } = process.env;

let apolloClient = null;

function create(
  options: InitApolloOptions<any>
): ApolloClient<NormalizedCacheObject> {
  const isBrowser = typeof window !== 'undefined';

  const enchancedFetch = async (url, init): Promise<Response> => {
    const response = await fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Cookie: options.ctx.req.headers.cookie,
      },
    });
    return response;
  };

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: createHttpLink({
      fetch: !isBrowser ? enchancedFetch : fetch,
      uri: GRAPHQL_SERVER_URI,
      credentials: 'include',
    }),
    cache: new InMemoryCache().restore(options.initialState || {}),
  });
}

export function initApollo(
  options: InitApolloOptions<any>
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(options);
  }

  return apolloClient;
}

export default initApollo;
