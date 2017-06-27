var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var uncss = require('gulp-uncss');
var sass = require('gulp-sass');
var watchSass = require("gulp-watch-sass")
var browserSync = require('browser-sync');



gulp.task('sass', function () {
  return gulp.src('css/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('out/'));
});

gulp.task ('css', function() {
  return gulp.src('out/*')
    .pipe(concatCss("/style.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(''))
    ;
});

var cmq = require('gulp-combine-media-queries');
 

gulp.task('watch', function() {
    gulp.watch('css/*.sass', ['sass', 'css']);
});


gulp.task('default', ['watch', 'sass', 'css']);







