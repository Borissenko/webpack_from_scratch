//сдесь мы разбили-объединяем webpack.config.js на основе webpack-merge,
//base добавляем в dev и в build
//Можно это делать с использованием не webpack-merge, а используя ENV.

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {  //это для удобства, если позже понадобиться менять путь к ../src и ../dist  ...
  src: path.join(__dirname, '../src'),  //если обратиться просто src, то попадем ../src/index.js
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/' //изменив 'assets/' на 'static/' мы в dist при билде получим папку static
}

module.exports = {
  // BASE config
  externals: {    //обеспечивает доступ к PATHS и в других файлах- в webpack.build.conf.js и webpack.dev.conf.js
    paths: PATHS  //из них будем обращаться к PATHS with: const baseWebpackConfig = require('./webpack.base.conf'); baseWebpackConfig.externals.paths.dist
  },
  entry: {
    app: PATHS.src, //=>>../src/index.js
    // module: `${PATHS.src}/your-module.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    // filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/' //это для devServer, baseURL для publicPath задаем by contentBase в webpack.base.conf.js
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
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
        name: '[name].[ext]'
      }
    }, {
      test: /\.scss$/,
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
      'vue$': 'vue/dist/vue.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({   //css будет собираться в отдельный от js файл
      filename: `${PATHS.assets}css/[name].[hash].css`, //путь для output результата работы
    }),
    // Copy HtmlWebpackPlugin and change index.html for another html page
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: '' },
    ])
  ],
}
