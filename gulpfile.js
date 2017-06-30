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
    .pipe(gulp.dest('css/out/'));
});

gulp.task ('css', function() {
  return gulp.src('css/out/*')
    .pipe(concatCss("/style.css"))
    .pipe(gulp.dest(''))
    ;
});
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: ''
        },
        files: ['*.html', 'out/**/*.css'],
        port: 8080
    });
});


var cmq = require('gulp-combine-media-queries');
 

gulp.task('watch', function() {
    gulp.watch('css/*.sass', ['sass', 'css']);
});


gulp.task('default', ['watch', 'sass', 'css']);
