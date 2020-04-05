require('dotenv').config();

const webpack = require('webpack');

module.exports = {
  publicRuntimeConfig: {
    GRAPHQL_SERVER_URI: process.env.GRAPHQL_SERVER_URI,
    NODE_ENV: process.env.NODE_ENV,
  },
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
};
