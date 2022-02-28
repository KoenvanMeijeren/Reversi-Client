const {src, dest} = require('gulp');
const order = require('gulp-order');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

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
const dist = function (backendPath, javascriptFiles, javascriptFilesOrder) {
    return function () {
        return src(javascriptFiles)
            .pipe(order(javascriptFilesOrder, {base: './'}))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(dest('dist'))
            .pipe(dest(`${backendPath}/dist`));
    }
};

exports.dist = dist;