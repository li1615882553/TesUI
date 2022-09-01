// webpack.component.js
var path = require('path')
var webpack = require('webpack')
const { merge } = require('webpack-merge');
const allComponents = require('./components')
const webpackBaseConfig = require('./webpack.base.js');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: allComponents.reduce((entries, dir) => {
    const fullDir = path.join(process.cwd(), path.join('./components', dir, './index.tsx'));
    entries[dir] = fullDir
    return entries;
  }, {}),
  output: {
    path: path.resolve(process.cwd(), "./lib"),
    filename: '[name].js',
    library: {
      name: "[name]",
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  optimization: {
    minimize: false
  },
});