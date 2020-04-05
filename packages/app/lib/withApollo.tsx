/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'cross-fetch';

const { GRAPHQL_SERVER_URI } = process.env;

const httpLink = createHttpLink({
  credentials: 'include',
  fetch,
  uri: GRAPHQL_SERVER_URI,
});

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    // eslint-disable-next-line react/prop-types
    render: ({ Page, props }) => {
      const { apollo } = props;
      return (
        <ApolloProvider client={apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
