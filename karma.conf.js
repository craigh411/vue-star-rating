// https://github.com/Nikku/karma-browserify
module.exports = function(config) {
    config.set({
        browsers: [
            'PhantomJS'
            //'Chrome'
        ],
        frameworks: ['jasmine'],
        files: ['spec/**/*.js'],
        reporters: ['spec'],
        preprocessors: {
            'spec/**/*.js': ['webpack']
        },
        webpack: {
            module: {
                rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }, {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }]
            }
        },
        // if you want to continuously re-run tests on file-save,
        // replace the following line with `autoWatch: true`
        singleRun: true
    })
}
