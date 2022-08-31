var path = require('path')
var webpack = require('webpack')
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');
require("../scripts/buildEntry");

module.exports = merge(webpackBaseConfig, {
  entry: path.resolve(__dirname, "../components/index.tsx"),
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: '[name].js',
    library: {
      name: "TesUI",
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  }
});