/* eslint-disable @typescript-eslint/explicit-function-return-type */
import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '@rebass/preset';
import withApollo from 'next-with-apollo';
import getConfig from 'next/config';
import { ApolloProvider } from '@apollo/react-hooks';

import initApolloClient from '../utils/init-apollo';

interface ComponentProps {
  apollo?: any;
}

interface ComponentState {
  user?: any;
}

class GOBApp extends App<ComponentProps, {}, ComponentState> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps: { user?: any } = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user;
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user
    };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    console.log('=> pageProps', pageProps);
    const { token } = pageProps;

    const props = {
      ...pageProps,
      user: this.state.user
    };

    // const currentUser = token ? jwtDecode(token) : null;
    // const data = { currentUser: formatUserFromToken(currentUser) };
    // const user = formatUserFromToken(currentUser);
    // apolloClient.cache.writeData({ data });

    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;

    return (
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          <Component {...props} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(({ initialState, ctx }) => initApolloClient(initialState, ctx))(GOBApp);
