const { defineConfig } = require('@vue/cli-service')
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = defineConfig({
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
