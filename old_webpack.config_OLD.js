const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')  //это плагин (функция), поэтому ее регистрируем в плагинах

module.exports = {
  entry: {
    app: './src/index.js'  //app => [name] in output
  },
  output: {
    filename: '[name].js', //name = app et entry. If we have several entryPoint
    path: path.resolve(__dirname, './dist'),  //dist при 'run dev' будет существовать только виртуально, не в проекте
    publicPath: '/dist'  // for devServer
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: ['babel-loader'],
      exclude: '/node_modules/'
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
        }
      ]
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,  //что бы css собиралось в отдельный от js файл
        {
          loader: 'css-loader',
          options: {sourceMap: true}
        }, {
          loader: 'postcss-loader',
          options: {sourceMap: true, config: {path: 'src/js/postcss.config.js'}}
        }, {
          loader: 'sass-loader',
          options: {sourceMap: true}
        }
      ]
    }
    ]
  },
  devServer: {
    overlay: true  //что бы ошибки выводились не в консоле, а в броузере
  },
  plugins: [
    new MiniCssExtractPlugin({    //css будет собираться в отдельный от js файл
      filename: `[name].css`,
    })
  ]
}