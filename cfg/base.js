'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

let CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'files/*', to: 'files' }
      ])
  ],
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['.scss', '.css', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      files: `${defaultSettings.srcPath}/files/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  module: {}
};
