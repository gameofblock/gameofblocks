require('dotenv').config();

const webpack = require('webpack');

module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'http://127.0.0.1:4000',
    GRAPHQL_SERVER_URI:
      process.env.GRAPHQL_SERVER_URI || 'http://localhost:5000/v1/graphql',
    NODE_ENV: process.env.NODE_ENV
  },
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  }
};
