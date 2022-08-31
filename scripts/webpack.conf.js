var path = require('path')
var webpack = require('webpack')
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    app: [path.resolve(process.cwd(), "./components/index.tsx")]
  },
  output: {
    path: path.resolve(process.cwd(), "./lib"),
    filename: 'index.js',
    chunkFilename: '[id].js',
    library: {
      name: "TesUI",
      type: 'umd',
      export: 'default'
    },
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments:false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
});