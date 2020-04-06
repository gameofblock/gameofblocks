/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApollo, { WithApolloProps } from 'next-with-apollo';
import { initApollo } from '../lib/init-apollo';

interface MainComponentProps extends WithApolloProps<any>, AppProps {}

class GameOfBlocks extends React.Component<MainComponentProps> {
  static async getInitialProps() {
    return {};
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApollo(initApollo)(GameOfBlocks);
