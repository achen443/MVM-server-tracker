const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        "url": require.resolve("url/"),
        "util": require.resolve("util/"),
        "assert": require.resolve("assert/"),
        "process": require.resolve("process/browser")
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
        })
      );

      return webpackConfig;
    },
  },
};
