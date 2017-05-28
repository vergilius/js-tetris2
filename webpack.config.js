const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const CSS = path.join(SRC, 'css');
const JS = path.join(SRC, 'js');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  entry: path.join(JS, 'index.js'),
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: path.join(CSS, 'default.css') } ])
  ],
  devtool: 'source-map'
};
