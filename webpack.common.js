const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: path.resolve(__dirname, 'src/background/index.ts'),
    content: path.resolve(__dirname, 'src/content/index.ts'),
    popup: path.resolve(__dirname, 'src/popup/index.tsx'),
    upload: path.resolve(__dirname, 'src/upload.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/popup/index.html'),
      filename: 'popup/index.html',
      chunks: ['popup'],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'assets', to: 'assets' }, // This line copies the entire assets directory
      ],
    }),
  ],
  performance: {
    maxAssetSize: 500000, // in bytes
  }
};
