const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var path = require('path')

// webpack.base.js
module.exports = {
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
              plugins: ['./plugins/transform-jsx.js']
            },
          },
          {
            loader: 'ts-loader',
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
           filename:"styles/font/[name].[ext]"
         }
       }
    ]
  },
  externals :{
    "tes-work":"tes-work",
    "classnames": "classnames"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
    mainFiles: ['index'],
    alias:{
      "@component": path.resolve(__dirname, "../components")
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    })
  ]
}