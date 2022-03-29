var
gulp = require('gulp'),
path = require('path'),
fs = require('fs'),
pkg = JSON.parse(fs.readFileSync('package.json')),
sass = require('gulp-sass'),
gp_concat = require('gulp-concat'),
gp_rename = require('gulp-rename'),
cssmin = require('gulp-cssmin'),
gp_uglify = require('gulp-uglify'),
replace = require('gulp-replace'),
svgcss = require('gulp-svg-css'),
maps = require('gulp-sourcemaps'),
svgmin = require('gulp-svgmin'),
spritesmith = require('gulp.spritesmith');


//      _         _
//  ___| |_ _   _| | ___  ___
// / __| __| | | | |/ _ \/ __|
// \__ \ |_| |_| | |  __/\__ \
// |___/\__|\__, |_|\___||___/
// 

gulp.task('sass', function () {
	return gulp.src('assets/css/sass/theme.min.scss')
	.pipe(maps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))	
	.pipe(gulp.dest('assets/css'))
});

gulp.task('svg', function () {
	return gulp.src('assets/svg**/*.svg')
	.pipe(svgmin())
	.pipe(svgcss({
		fileName: 'svg',
		cssPrefix: 'icon-',
		addSize: false
	}))
	.pipe(gulp.dest('assets/css'));
});

gulp.task('sprites', function () {
  var spriteData = gulp.src('assets/images/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite2.png',
    cssName: 'sprite-image.css',
    imgPath: '../images/sprite2.png'
  }));
    
    spriteData.css.pipe(gulp.dest('assets/css'));
    spriteData.img.pipe(gulp.dest('assets/images'));

    return spriteData;
});



gulp.task('deploy', function () {
	return gulp.src('assets/css/*.css')
	.pipe(maps.init())
	.pipe(gp_concat('concat.css'))
	.pipe(gp_rename('assinar-v2.css'))
	.pipe(cssmin())
	.pipe(replace('../images/', '/arquivos/'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('assets/build'));
});

//    _                                _       _
//   (_) __ ___   ____ _ ___  ___ _ __(_)_ __ | |_
//   | |/ _` \ \ / / _` / __|/ __| '__| | '_ \| __|
//   | | (_| |\ V / (_| \__ \ (__| |  | | |_) | |_
//  _/ |\__,_| \_/ \__,_|___/\___|_|  |_| .__/ \__|
// |__/     

gulp.task('js', function () {
    return gulp.src([		
    	'assets/js/*.js'    	
   ])
	.pipe(gp_concat('concat.js'))
	.pipe(gp_rename('assinar-v2.js'))
	.pipe(gp_uglify())
  .pipe(gulp.dest('assets/build'));
});



//                _       _
// __      ____ _| |_ ___| |__
// \ \ /\ / / _` | __/ __| '_ \
//  \ V  V / (_| | || (__| | | |
//   \_/\_/ \__,_|\__\___|_| |_|

gulp.task('watch', function() {
	gulp.watch(['assets/css/sass/*.scss', 'assets/css/sass/mobile/*.scss'], gulp.series([ 'sass', 'svg', 'sprites', 'deploy' ]));		
	gulp.watch(['assets/js/*.js'], gulp.series('js'));	
});