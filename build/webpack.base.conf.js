//сдесь мы разбили-объединяем webpack.config.js на основе webpack-merge,
//base добавляем в dev и в build
//Можно это делать с использованием не webpack-merge, а используя ENV.

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //это плагин (функция), поэтому ее регистрируем в плагинах
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {    //это для удобства, если позже понадобиться менять путь к ../src и ../dist  ...
  src: path.join(__dirname, '../src'),  //если обратиться src/просто, то попадем ../src/index.js
  dist: path.join(__dirname, '../dist'),  //при сборке создается папка dist
  assets: 'assets/' //изменив 'assets/' на 'static/' мы в dist при билде получим папку static
}
// ../src - это путь от данного файла, тюею от webpack.dev.conf.js
// итого- мы выходим из build и обращаемся к src в корне проекта
// Пути, которые мы прописываем в коде проекта, Нр: src="" у <img>, - это пути по папкам в отбилденном dist, а не по папкам проекта !!!!


module.exports = {
  externals: {    //обеспечивает доступ к PATHS и в других файлах- в webpack.build.conf.js и webpack.dev.conf.js,
    paths: PATHS  //из них будем обращаться к PATHS with: const baseWebpackConfig = require('./webpack.base.conf'); baseWebpackConfig.externals.paths.dist
  },
  entry: {          //app транслируется в [name] в output'e и в плагине MiniCssExtractPlugin.
    app: PATHS.src, //PATHS.src- это путь к ../src/index.js
    module: `${PATHS.src}/your_module.js`,  //вторая точка входа для редкообновляемой части проекта.
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,  //name = app et entry. If we have several entryPoint
    // к имени файла добавляем [hash], что бы происходила пересборка и перезакачка клиенту при изменении кода этого файла
    path: PATHS.dist,
    publicPath: '/' //это для devServer, a baseURL для publicPath задаем by contentBase в webpack.base.conf.js
  },
  optimization: {
    splitChunks: {  //для сборки библиотек и чистого проекта по разным файлам
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/, //это регулярное выражение. Все из node_modules будет собираться в vendor.js
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loader: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'  //name- это app in entry, ext- это png
      }
    }, {
      test: /\.scss$/,  //в компоненте указываем <style lang="scss" scoped>
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/new_postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
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
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/new_postcss.config.js` } }
        }
      ]
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js' // что бы в index.js писать просто 'window.Vue = require('vue')'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({   //css будет собираться в файл, отдельный от js.
      filename: `${PATHS.assets}css/[name].[hash].css`, //путь для output (результата работы)
    }),
    //к имени файла добавляем [hash], что бы происходила пересборка и перезакачка клиенту при изменении кода этого файла


    //Copy HtmlWebpackPlugin and change index.html for another html page
    //dist/index.html генерируется на основе src/index.html проекта.
    //доп-но, когда мы изменяем html-код проекта, он автоматически обнавляется в и сборке, и в броузере.
    new HtmlWebpackPlugin({
    // hash: false,
      template: `${PATHS.src}/index.html`,  //какой html-файл копируем из src поекта
      filename: './index.html',             //имя нового .html в dist'e
      inject: true  //если поставить false, то при билде в <head> у index.html не будет добавляться <linc> с хрефом на css-файл,
      // его надо будет прописывать вручную в материнском index.html
      //см. description часть C.
      //см. https://webpack.js.org/plugins/html-webpack-plugin/
    }),
    new CopyWebpackPlugin([
      //img- не JS-код, поэтому его надо копировать
      //также файлы с расширением в ед экземпляре- легче скопировать, чем лоудить через module.rules
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` }, //копируем СОДЕРЖИМОЕ img в проекте в dist/assets/img
      { from: `${PATHS.src}/static`, to: '' },  //копируем СОДЕРЖИМОЕ static проекта в корень dist
    ])
   // Пути, которые мы прописываем в коде проекта, Нр: src="" у <img>, - это пути по папкам в отбилденном dist, а не по папкам проекта !!!!
  ],
}
