import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import babelify from "babelify";
import vueify from "vueify";
import uglify from "gulp-uglify";
import watchify from "watchify";
import buffer from "vinyl-buffer";
import { Server } from "karma";

const entry = "src/dist.js";
const dest = "dist"; // destination folder

gulp.task('default', () => {
    browserify({
            entries: entry,
            debug: true
        })
        .bundle()
        .pipe(source('star-rating.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(dest));
});

gulp.task('watch', () => {
    const b = browserify({
        entries: entry,
        plugin: [watchify],
        debug: true,
        cache: {},
        packageCache: {}
    })

    b.on('update', bundle);
    bundle();

    function bundle() {
        b.bundle()
            .on('error', err => {
                gutil.log("Browserify Error", gutil.colors.red(err.message))
            })
            .pipe(source('star-rating.js'))
            .pipe(gulp.dest(dest));
    }
});

/**
 * Run tests using karma.
 */
gulp.task('test', done => {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});
