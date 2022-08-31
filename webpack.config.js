const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const allComponents = require('./scripts/components')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: "none",
  entry: allComponents.reduce((entries, dir) => {
    const fullDir = path.join(__dirname, path.join('components', dir, './index.tsx'));
    entries[dir] = fullDir
    return entries;
  }, {}),
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: '[name]/[name].js',
    library: {
      name: "[name]",
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this',
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
              plugins: ['./plugins/transform-jsx']
            },
          },
          {
            loader: 'ts-loader',
            // options: {
            //   transpileOnly: true
            // }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test:/\.ttf|eot|woff2?$/i,
         type:"asset/resource",
         generator:{
           filename:"font/[name].[ext]"
         }
       }
    ]
  },
  externals :{
    "tes-work":"Tes"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
    mainFiles: ['index'],
    alias:{
      "@component": path.resolve(__dirname, "./components")
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css'
    })
  ]
}