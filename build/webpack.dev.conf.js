const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist, //указывает baseURL для пути к index.html, а сам путь указан в output.publicPath
    port: 8081,
    overlay: {  //что бы ошибки выводились не в консоле, а в броузере
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({  //для карты сайта. Иначе в main.scss подключаемые через @import файлы- не увидяться
      filename: '[file].map'              //Теперь, если запустить дев разработку можно увидеть что на каждую строчку css кода выводится корректный scss файл!
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
