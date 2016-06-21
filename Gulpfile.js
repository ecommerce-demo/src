var gulp = require('gulp');
var connect = require('gulp-connect');
var flipper = require('gulp-css-flipper');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('build'))
  .pipe(connect.reload());
});

gulp.task('css', function() {
  var flip = gulp.src(['src/css/*.css', '!src/css/style.css']).pipe(flipper());
  var noFlip = gulp.src('src/css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }));
  
  return merge(flip, noFlip)
  .pipe(cleanCSS())
  .pipe(gulp.dest('build/css'))
  .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
  .pipe(connect.reload());
});

gulp.task('fonts', function() {
  var jfFlat = gulp.src('src/css/font/*')
  .pipe(gulp.dest('build/css/font'));

  var otherFonts = gulp.src('src/fonts/*')
  .pipe(gulp.dest('build/fonts'))
  
  return merge(jfFlat, otherFonts)
  .pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/images'))
  .pipe(connect.reload());
});

gulp.task('build', ['html', 'css', 'js', 'fonts', 'images']);

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
    port: 8080,
  })
});

gulp.task('watch', function() {
  return gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['build', 'connect', 'watch']);