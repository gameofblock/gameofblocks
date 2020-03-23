require('dotenv').config({ path: `${__dirname}/../../.env` });

const webpack = require('webpack');

module.exports = {
  env: {
    API_URL:  process.env.API_URL,
  },
  publicRuntimeConfig: {
    GRAPHQL_SERVER_URI:
      process.env.GRAPHQL_SERVER_URI || 'http://localhost:5000/v1/graphql',
    NODE_ENV: process.env.NODE_ENV
  },
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  }
};
