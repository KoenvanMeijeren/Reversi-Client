const {src, dest} = require('gulp');
const order = require('gulp-order');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const minifyJs = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

/**
 * Creates the distributed files.
 *
 * @param {string} backendPath
 *   The path to the backend directory.
 * @param {string[]} javascriptFiles
 *   The javascript files.
 * @param {string[]} javascriptFilesOrder
 *   The order of the javascript files.
 *
 * @return {function(): *}
 *   The pipeline.
 */
const distJavascript = function (backendPath, javascriptFiles, javascriptFilesOrder) {
    return function () {
        return src(javascriptFiles)
            .pipe(order(javascriptFilesOrder, {base: './'}))
            .pipe(concat('app.min.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(minifyJs())
            .pipe(dest('dist'))
            .pipe(dest(`${backendPath}/dist`));
    }
};

/**
 * Creates the distributed files.
 *
 * @param {string} backendPath
 *   The path to the backend directory.
 * @param {string[]} cssFiles
 *   The css files.
 * @param {string[]} cssFilesOrder
 *   The order of the css files.
 *
 * @return {function(): *}
 *   The pipeline.
 */
const distCss = function (backendPath, cssFiles, cssFilesOrder) {
    return function () {
        return src(cssFiles)
            .pipe(order(cssFilesOrder, {base: './'}))
            .pipe(concat('app.min.css'))
            .pipe(cleanCSS())
            .pipe(dest('dist'))
            .pipe(dest(`${backendPath}/dist`));
    }
};

exports.distJavascript = distJavascript;
exports.distCss = distCss;