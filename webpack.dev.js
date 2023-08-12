const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path'); // Make sure to import 'path'

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'), // Use 'static' instead of 'contentBase'
    },
    hot: true,
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new ChromeExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'content-script',
        background: 'background',
      },
    }),
  ],
});
