const path = require('path');
const webpack = require('webpack');

const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  entry: path.join(SRC, 'index.js'),
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
  devtool: 'source-map'
};
