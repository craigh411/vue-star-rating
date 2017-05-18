var path = require('path')
var webpack = require('webpack')

module.exports = {
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
            enforce: "pre",
            test: /\.(js|vue)$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            include: /\.min\.js$/,
            compress: {
                warnings: false
            }
        })
    ],
    devtool: 'source-map'
}
