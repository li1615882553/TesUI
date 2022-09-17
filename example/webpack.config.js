const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(process.cwd(), "./example/index.tsx"),
  output: {
    path: path.resolve(process.cwd(), './build'),
    filename: 'js/index.js',
    chunkFilename: 'js/[name:8].js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  { pragma: 'createElement' },   //将React.createElement 改为 createElement   替代编译JXS表达式时使用的函数
                ],
              ],
              plugins: [path.resolve(process.cwd(), './plugins/transform-jsx')]
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(md)$/i,
        type: 'asset/source'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    mainFiles: ['index'],
    alias: {
      "@component": path.resolve(__dirname, "../components")
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), './example/index.html'),
      favicon: path.resolve(process.cwd(), './example/favicon.ico'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    static: path.resolve(process.cwd(), './build'),
    compress: false,
    port: 8080,
    hot: true,
  },
}