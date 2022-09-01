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
    filename: 'tes-ui.common.js',
    chunkFilename: '[id].js',
    library: {
      name: "TesUI",
      export: 'default',
      type: "commonjs2"
    }
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