var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'star-rating': './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        library: 'VueStarRating',
        libraryTarget: 'umd',
        umdNamedDefine: true
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
