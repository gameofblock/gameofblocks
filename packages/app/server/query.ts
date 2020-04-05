import fetch from 'isomorphic-unfetch';

import env from '@gameofblocks/env';

const { GRAPHQL_SERVER_URI, HASURA_SECRET } = env;

export interface OptionsQuery<T> {
  query: string;
  variables?: T[];
  operationName?: string;
}

async function query<Variables, Response>(
  options: OptionsQuery<Variables>
): Promise<Response> {
  const { json } = await fetch(GRAPHQL_SERVER_URI, {
    method: 'POST',
    headers: {
      'x-hasura-admin-secret': HASURA_SECRET,
    },
    body: JSON.stringify({
      query: options.query,
      variables: options.variables,
      operationName: options.operationName,
    }),
  });

  const { data } = await json();
  return data;
}

export default query;
