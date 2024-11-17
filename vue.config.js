const { defineConfig } = require('@vue/cli-service')
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const history = require('connect-history-api-fallback');

module.exports = defineConfig({
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Add middleware to set the Document-Policy header
      devServer.app.use((req, res, next) => {
        res.setHeader('Document-Policy', 'js-profiling');
        next();
      });

      middlewares.push(history());
      return middlewares;
    },
  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      sentryWebpackPlugin({
        authToken: process.env.VUE_APP_AUTH_TOKEN,
        org: 'snout-and-about',
        project: 'snout-frontend',
      })
    ]
  }
})
