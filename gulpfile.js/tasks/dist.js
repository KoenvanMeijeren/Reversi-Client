// General
const { src, dest } = require('gulp');
const del = require('del');
const order = require('gulp-order');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const header = require('gulp-header');
const packageJson = require('../../package.json');

// Js
const uglify = require('gulp-terser');
const optimizeJs = require('gulp-optimize-js');

// Styles
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const prefix = require('autoprefixer');
const minify = require('cssnano');

// Template settings
const banner = {
    main:
        '/*!' +
        ' <%= package.name %> v<%= package.version %>' +
        ' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
        ' | <%= package.license %> License' +
        ' | <%= package.repository.url %>' +
        ' */\n'
};

// Remove pre-existing content from output folders
const cleanDist = function (backendPath) {
    return function () {
        return del([
            'dist',
            `${backendPath}/dist`
        ]);
    };
};

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
            .pipe(order(javascriptFilesOrder, { base: './' }))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(header(banner.main, { package: packageJson }))
            .pipe(optimizeJs())
            .pipe(dest('dist'))
            .pipe(dest(`${backendPath}/dist`))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest('dist'))
            .pipe(dest(`${backendPath}/dist`))
    }
}

/**
 * Creates the distributed files.
 *
 * @param {string} backendPath
 *   The path to the backend directory.
 * @param {string[]} cssFiles
 *   The css files.
 *
 * @return {function(): *}
 *   The pipeline.
 */
const distCss = function (backendPath, cssFiles) {
    return function () {
        return src(cssFiles)
            .pipe(sass({
                outputStyle: 'expanded',
                sourceComments: true
            }))
            .pipe(postcss([
                prefix({
                    cascade: true,
                    remove: true
                })
            ]))
            .pipe(header(banner.main, { package: packageJson }))
            .pipe(dest('dist'))
            .pipe(dest(`${backendPath}/dist`))
            .pipe(rename({ suffix: '.min' }))
            .pipe(postcss([
                minify({
                    discardComments: {
                        removeAll: true
                    }
                })
            ]))
            .pipe(dest('dist'))
            .pipe(dest(`${backendPath}/dist`));
    }
}

exports.distClean = cleanDist;
exports.distJavascript = distJavascript;
exports.distCss = distCss
