var gulp = require('gulp');
var connect = require('gulp-connect');
var flipper = require('gulp-css-flipper');
var merge = require('merge-stream');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sassToCSS = require('gulp-sass');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
    port: 8080
  })
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('watch', function() {
  return gulp.watch('src/**/*', ['build']);
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('build'))
  .pipe(connect.reload());
});

gulp.task('css', function() {
  var flip = gulp.src(['src/css/*.css', '!src/css/old-style.css']).pipe(flipper());
  var noFlip = gulp.src('src/css/old-style.css');
  
  return merge(flip, noFlip)
  .pipe(cleanCSS())
  .pipe(gulp.dest('build/css'))
  .pipe(connect.reload());
});

gulp.task('scss', function() {
  return gulp.src('src/scss/*.scss')
  .pipe(sassToCSS({ outputStyle: 'compressed' }))
  .pipe(gulp.dest('build/css'))
})

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
  .pipe(connect.reload());
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/*')
  .pipe(gulp.dest('build/fonts'))
  .pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
  .pipe(gulp.dest('build/images'))
  .pipe(connect.reload());
});

gulp.task('build', ['html', 'css', 'scss', 'js', 'fonts', 'images']);

gulp.task('default', ['connect', 'build', 'watch']);
