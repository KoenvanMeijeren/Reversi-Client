// Configuration
const outputDirectory = 'public/';
const distDirectory = 'dist/';
const outputPath = `${outputDirectory}/${distDirectory}`;

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
const stripJs = require('gulp-strip-comments');

// Styles
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const prefix = require('autoprefixer');
const minify = require('cssnano');
const stripCss = require('gulp-strip-css-comments');
const browserSync = require('browser-sync');

// HTML
const htmlmin = require('gulp-htmlmin');

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
const clean = function (backendPath) {
    return function () {
        return del([
            outputPath,
            `${backendPath}/${outputPath}`
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
const javascript = function (backendPath, javascriptFiles, javascriptFilesOrder) {
    return function () {
        return src(javascriptFiles)
            .pipe(order(javascriptFilesOrder, { base: './' }))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(optimizeJs())
            .pipe(stripJs())
            .pipe(header(banner.main, { package: packageJson }))
            .pipe(dest(outputPath))
            .pipe(dest(`${backendPath}/${outputPath}`))
            .pipe(uglify({
                compress: true
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(dest(outputPath))
            .pipe(dest(`${backendPath}/${outputPath}`))
            .pipe(browserSync.stream());
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
const css = function (backendPath, cssFiles) {
    return function () {
        return src(cssFiles)
            .pipe(sass({
                outputStyle: 'expanded',
                sourceComments: false
            }))
            .pipe(postcss([
                prefix({
                    cascade: true,
                    remove: true
                })
            ]))
            .pipe(stripCss({
                preserve: false
            }))
            .pipe(header(banner.main, { package: packageJson }))
            .pipe(dest(outputPath))
            .pipe(dest(`${backendPath}/${outputPath}`))
            .pipe(postcss([
                minify()
            ]))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(dest(outputPath))
            .pipe(dest(`${backendPath}/${outputPath}`))
            .pipe(browserSync.stream());
    };
}

/**
 * Creates the distributed files.
 *
 * @param {string} backendPath
 *   The path to the backend directory.
 *
 * @return {function(): *}
 *   The pipeline.
 */
const html = function (backendPath) {
    return function () {
        return src(['./public/index.html'])
            .pipe(htmlmin({
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                removeComments: true
            }))
            .pipe(rename(function (path) {
                path.dirname += './public/';
                path.basename = 'index';
                path.extname = '.html';
            }))
            .pipe(dest('./public'))
            .pipe(dest(`${backendPath}/public`))
            .pipe(browserSync.stream());
    };
};

exports.clean = clean;
exports.javascript = javascript;
exports.css = css;
exports.html = html;
