const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path'); // Make sure to import 'path'

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'), // Use 'static' instead of 'contentBase'
    },
    hot: true,
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
  ],
});
