'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

let FlowtypePlugin = require('flowtype-loader/plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new FlowtypePlugin({
      failOnError: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.rules.push({
  test: /\.js$/,
  loader: 'flowtype-loader',
  enforce: 'pre',
  exclude: /node_modules/
});

config.module.rules.push({
  test: /\.(js|jsx)$/,
  use: [
    { loader: 'babel-loader'}
  ],
  exclude: /node_modules/
});

module.exports = config;
