var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var flip = require('gulp-css-flipper');

gulp.task('fonts', function() {
  gulp.src('src/fonts/*')
  .pipe(gulp.dest('build/fonts'))
  .pipe(connect.reload());
});

gulp.task('css', ['fonts'], function() {
  gulp.src('src/styles/*.css')
  .pipe(flip())
  .on('error', gutil.log)
  .pipe(gulp.dest('build/styles'))
  .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('src/*.html')
  .on('error', gutil.log)
  .pipe(gulp.dest('build'))
  .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src('src/scripts/*.js')
  .on('error', gutil.log)
  .pipe(gulp.dest('build/scripts'))
  .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src('src/images/*')
  .on('error', gutil.log)
  .pipe(gulp.dest('build/images'))
  .pipe(connect.reload());
})

gulp.task('build', ['html', 'css', 'js', 'images']);

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 8001,
    livereload: true,
    debug: true
  });
});

gulp.task('watch', function() {
  gulp.watch(['src/*.html'], ['html']);
  gulp.watch(['src/styles/*.css'], ['css']);
  gulp.watch(['src/scripts/*.js'], ['js']);
});

gulp.task('default', ['build', 'watch', 'connect'])