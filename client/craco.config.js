const path = require('path');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "zlib": require.resolve("browserify-zlib"),
          "querystring": require.resolve("querystring-es3"),
          "path": require.resolve("path-browserify"),
          "crypto": require.resolve("crypto-browserify"),
          "stream": require.resolve("stream-browserify"),
          "http": require.resolve("stream-http"),
          "fs": false,
          "net": false,
          "url": require.resolve("url/"),
          "util": require.resolve("util/"),
          "assert": require.resolve("assert/")
        }
      }
    }
  }
};
