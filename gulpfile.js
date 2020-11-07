'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./style'));
});
 
gulp.task('watch', function () {
    gulp.watch('scss/styles.scss', gulp.parallel('sass'));
  });