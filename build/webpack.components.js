// webpack.component.js
var path = require('path')
var webpack = require('webpack')
const { merge } = require('webpack-merge');
const allComponents = require('../scripts/components')
const webpackBaseConfig = require('./webpack.base.js');

module.exports = merge(webpackBaseConfig, {
  mode: "none",
  entry: allComponents.reduce((entries, dir) => {
    const fullDir = path.join(__dirname, path.join('../components', dir, './index.tsx'));
    entries[dir] = fullDir
    return entries;
  }, {}),
  output: {
    path: path.resolve(__dirname, "../lib"),
    filename: '[name].js',
    library: {
      name: "[name]",
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this',
    clean: true
  }
});