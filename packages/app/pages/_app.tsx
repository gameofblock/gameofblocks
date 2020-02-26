import jwtDecode from 'jwt-decode';
import App from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'theme-ui';
import theme from '@rebass/preset';

import { Provider as UserProvider } from '../components/user-context';
import withApolloClient from '../components/hocs/with-apollo-client';
import { formatUserFromToken } from '../util';

interface ComponentProps {
  apolloClient?: any;
}

class MyApp extends App<ComponentProps> {
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
    const { Component, pageProps, apolloClient } = this.props;
    const { token } = pageProps;
    
    const currentUser = token ? jwtDecode(token) : null;
    const data = { currentUser: formatUserFromToken(currentUser) };
    const user = formatUserFromToken(currentUser);

    apolloClient.cache.writeData({ data });

    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <UserProvider user={user}>
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
