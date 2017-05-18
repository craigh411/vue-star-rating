var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'star-rating': './examples/commonjs/app.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devtool: 'eval-source-map'
}
