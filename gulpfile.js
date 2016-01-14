var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var del = require('del');
var sequence = require('gulp-sequence');
var Server = require('karma').Server;
var path = require('path');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('build', sequence('clean', 'transpile', 'copy:css'));

gulp.task('transpile', function() {
  return gulp.src('./src/angular-simple-pagination.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy:css', function() {
  return gulp.src([
      './src/angular-simple-pagination.css'
    ])
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
  return del([
    './dist/*'
  ]);
});

gulp.task('test', function (done) {
  new Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false
  }, done).start();
});

gulp.task('lint', sequence('jshint', 'jscs'));

gulp.task('jscs', function() {
  return gulp.src(['./src/*.js', './test/*.js'])
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('jshint', function() {
  return gulp.src(['./src/*.js', './test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(jshint.reporter('fail'));
});
