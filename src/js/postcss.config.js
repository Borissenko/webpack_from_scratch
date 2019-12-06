// autoprefixer - https://github.com/postcss/autoprefixer
// css-mqpacker - https://github.com/hail2u/node-css-mqpacker
// cssnano      - https://github.com/hail2u/node-css-mqpacker

// npm install postcss-loader autoprefixer css-mqpacker cssnano --save-dev

//он запрашивается в modules et webpack.config.js

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'),  // @media-запросы объединяет по размеру screen'a
    require('cssnano')({      //мимифицирует
      preset: [
        'default', {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
}
