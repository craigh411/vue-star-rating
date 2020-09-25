var path = require('path')
var webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    mode: 'production',
    entry: {
        'star-rating': './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].min.js',
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
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    devtool: 'source-map'
}
