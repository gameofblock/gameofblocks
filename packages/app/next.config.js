const env = require('@gameofblocks/env');
const webpack = require('webpack');

module.exports = {
  publicRuntimeConfig: {
    GRAPHQL_SERVER_URI: env.GRAPHQL_SERVER_URI,
    NODE_ENV: env.NODE_ENV,
  },
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(env));
    return config;
  },
};
