const path = require('path')

module.exports = {
    entry: {
        app: './src/index.js'
    },

    output: {
        filename: '[name].js', //name = app et entry. If we have several entryPoint
        path: path.resolve(__dirname, './dist'),  //dist при run dev будет существовать только виртуально, не в проекте
        publicPath: '/dist'  // for devServer
    },
    devServer: {
        overlay: true  //что бы ошибки выводились не в консоле, а в броузере
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: ['babel-loader'],
            exclude: '/node_modules/'
        }]
    }
}