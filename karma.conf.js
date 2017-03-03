// https://github.com/Nikku/karma-browserify
module.exports = function(config) {
    config.set({
        browsers: [
            'PhantomJS',
           // 'Chrome'
        ],
        frameworks: ['browserify', 'jasmine'],
        files: ['spec/**/*.js'],
        reporters: ['spec'],
        preprocessors: {
            'spec/**/*.js': ['browserify']
        },
        // if you want to continuously re-run tests on file-save,
        // replace the following line with `autoWatch: true`
        singleRun: true
    })
}
