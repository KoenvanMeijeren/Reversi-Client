const config = require('./config');
const gulp = require('gulp');
const browserSync = require('browser-sync');

exports.js = require('./tasks/dist').javascript(config.localServerProjectPath, config.files.js, config.fileOrder.js);
exports.css = require('./tasks/dist').css(config.localServerProjectPath, config.files.css);
exports.clean = require('./tasks/dist').clean(config.localServerProjectPath);
exports.icons = require('./tasks/dist').copy(config.localServerProjectPath, config.files.icons, 'icons');
exports.html = require('./tasks/dist').html(config.localServerProjectPath);
exports.copyHandlebars = require('./tasks/dist').copyHandlebars(config.localServerProjectPath, config.files.handlebars);
exports.templates = require('./tasks/dist').templates(config.localServerProjectPath, config.files.templates);

exports.server = gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: `./public`
        }
    });

    gulp.watch('./src/css/**/*.scss').on('change', exports.css);
    gulp.watch('./src/javascript/**/*.js').on('change', exports.js);
    gulp.watch('./public/**/*.html').on('change', exports.html);
});