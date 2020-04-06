/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppProps, Container } from 'next/app';
import { NextPage } from 'next';
import { ApolloProvider } from 'react-apollo';
import withApollo, { WithApolloProps } from 'next-with-apollo';
import { initApollo } from '../lib/init-apollo';

interface MainComponentProps extends WithApolloProps<any>, AppProps {}

const GameOfBlocks: NextPage<AppProps> = (props: MainComponentProps) => {
  const { Component, pageProps, apollo } = props;
  return (
    <Container>
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  );
};

export default withApollo(initApollo)(GameOfBlocks);
