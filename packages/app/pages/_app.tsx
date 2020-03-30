import jwtDecode from 'jwt-decode';
import App from 'next/app';
import React from 'react';

interface ComponentProps {
  apolloClient?: any;
}

class GameOfBlocks extends App<ComponentProps> {
  static async getInitialProps(appContext) {
    const { Component, ctx } = appContext;

    let pageProps = {};

    try {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
    } catch (e) {
      //throw e; // you can also skip re-throwing and set property on pageProps
    }

    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component {...pageProps} />
    );
  }
}

export default GameOfBlocks;
