const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify');
const del = require('del');
const browserify = require('gulp-browserify')
const babelify = require('babelify')

const paths = {
    desktop: {
        styles: {
            src: "./src/assets/desktop/scss/*.scss",
            dest: "./dist/assets/desktop/css",
            srcWatch: "./src/assets/desktop/scss/**/*.scss"
        },
        scripts: {
            src: "./src/assets/desktop/js/*.js",
            dest: "./dist/assets/desktop/js",
            srcWatch: "./src/assets/desktop/js/**/*.js"
        }
    },
    mobile: {
        styles: {
            src: "./src/assets/mobile/scss/*.scss",
            dest: "./dist/assets/mobile/css",
            srcWatch: "./src/assets/mobile/scss/**/*.scss"
        },
        scripts: {
            src: "./src/assets/mobile/js/*.js",
            dest: "./dist/assets/mobile/js",
            srcWatch: "./src/assets/mobile/js/**/*.js"
        }
    },
    common: {
        styles: {
            src: "./src/assets/common/scss/*.scss",
            dest: "./dist/assets/common/css",
            srcWatch: "./src/assets/common/scss/**/*.scss"
        },
        scripts: {
            src: "./src/assets/common/js/*.js",
            dest: "./dist/assets/common/js",
            srcWatch: "./src/assets/common/js/**/*.js"
        }
    },
};

function clean(){

    return del(['dist'])
}

function stylesDesktop() {
    return gulp.src(paths.desktop.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(paths.desktop.styles.dest))
}

function stylesMobile() {
    return gulp.src(paths.mobile.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(paths.mobile.styles.dest))
}

function stylesCommon() {
    return gulp.src(paths.common.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(paths.common.styles.dest))
}

function scriptsDesktop(){
    
    return gulp.src(paths.desktop.scripts.src)
    .pipe(babel())
    .pipe(browserify({
        transform: ['babelify'],
      }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.desktop.scripts.dest))
}

function scriptsMobile(){
    
    return gulp.src(paths.mobile.scripts.src)
    .pipe(babel())
    .pipe(browserify({
        transform: ['babelify'],
      }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.mobile.scripts.dest))
}

function scriptsCommon(){
    
    return gulp.src(paths.common.scripts.src)
    .pipe(babel())
    .pipe(browserify({
        transform: ['babelify'],
      }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.common.scripts.dest))
}

function watch(){
    gulp.watch(paths.desktop.styles.srcWatch, stylesDesktop);
    gulp.watch(paths.desktop.scripts.srcWatch, scriptsDesktop);
    gulp.watch(paths.mobile.styles.srcWatch, stylesMobile);
    gulp.watch(paths.mobile.scripts.srcWatch, scriptsMobile);
    gulp.watch(paths.common.styles.srcWatch, stylesCommon);
    gulp.watch(paths.common.scripts.srcWatch, scriptsCommon);
}



const build = gulp.series(clean, gulp.parallel(stylesDesktop, scriptsDesktop, stylesMobile, scriptsMobile, stylesCommon, scriptsCommon));

exports.clean = clean;

exports.stylesDesktop = stylesDesktop;
exports.stylesMobile = stylesMobile;
exports.stylesCommon = stylesCommon;

exports.scriptsDesktop = scriptsDesktop;
exports.scriptsMobile = scriptsMobile;
exports.scriptsCommon = scriptsCommon;

exports.watch = watch;

exports.build = build;

exports.default = build;