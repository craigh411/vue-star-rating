const path = require('path')
const {VueLoaderPlugin} = require('vue-loader');
const webpack = require('webpack')

module.exports = {
    mode: 'development',
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
            exclude: /node_modules/,
            options: {
                babelrc: false,
                presets: ['@babel/preset-env']
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
        })
    ],
    devtool: 'eval-source-map'
}