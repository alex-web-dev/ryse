const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const del = require('del');
const {src, dest, watch, series, parallel} = require('gulp');
const yargs = require('yargs');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');

const isDev = yargs.argv.dev;
const isProd = !isDev;

function styles() {
    return src(['src/scss/styles.scss'])
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(isProd, postcss([ autoprefixer ])))
        .pipe(gulpif(isProd, cleanCss({compatibility:'ie8'})))
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return src('src/js/**/*.js')
    .pipe(dest('dist/js'));
}

function watcher() {
    watch('src/scss/**/*.scss', series(styles));
    watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
    watch(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'], series(copy, reload));
    watch('src/js/**/*.js', series(scripts, reload));
    watch(["**/*.php", "**/*.html"], reload);
}

function images() {
    return src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
        .pipe(dest('dist/images'))
        .pipe(src('src/images/**/*.{jpg,jpeg,png,svg,gif}'))
        .pipe(gulpif(isProd, imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 //0 to 7
        })))
        .pipe(dest('dist/images'));
}

function copy() {
    return src(['src/**/*','!src/{images,js,scss,iconsprite}','!src/{images,js,scss,iconsprite}/**/*'])
        .pipe(dest('dist'));
}

function clean() {
     return del(['dist'])
}

function browsersync(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false
    });
    done();
};

function reload(done) {
    browserSync.reload();
    done();
};

exports.styles = styles;
exports.watcher = watcher;
exports.images = images;
exports.copy = copy;
exports.clean = clean;
exports.browsersync = browsersync;

const dev = series(clean, parallel(styles, images, scripts), copy, browsersync, watcher);
const build = series(clean, parallel(styles, images, scripts), copy);

exports.dev = dev;
exports.build = build;
exports.default = dev;