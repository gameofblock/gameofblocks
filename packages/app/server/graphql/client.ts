import ApolloClient from 'apollo-boost';
import env from '@gameofblocks/env';
import 'cross-fetch/polyfill';

const { GRAPHQL_SERVER_URI, HASURA_SECRET } = env;

export const client = new ApolloClient({
  uri: GRAPHQL_SERVER_URI,

  headers: {
    'x-hasura-admin-secret': HASURA_SECRET,
  },
});
