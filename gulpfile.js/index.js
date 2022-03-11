const config = require('./config');
const gulp = require('gulp');
const browserSync = require('browser-sync');

exports.js = require('./tasks/dist').javascript(config.localServerProjectPath, config.files.js, config.fileOrder.js);
exports.css = require('./tasks/dist').css(config.localServerProjectPath, config.files.css);
exports.clean = require('./tasks/dist').clean(config.localServerProjectPath);

exports.server = gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: `./public`
        }
    });

    gulp.watch('./src/css/**/*.scss').on('change', exports.css);
    gulp.watch('./src/css/**/*.js').on('change', exports.js);
    gulp.watch('./public/**/*.html').on('change', browserSync.reload);
});