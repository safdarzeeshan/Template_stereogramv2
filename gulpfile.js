'use strict';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var source = require('vinyl-source-stream');
var filter = require('gulp-filter');
var runSequence = require('run-sequence');

var paths = {
  js: ['app/scripts/**/*.js'],
  sass: ['app/styles/**/*.sass'],
  html: ['app/views/*.html']
}

// Lint JS
gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(reload({stream: true, once: true}))
});

// Styles
gulp.task('styles', function() {
  return gulp.src(paths.sass)
    .pipe(sass({
      sourcemapPath: 'app/styles/',
      loadPath: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest('dist/styles'))
    .pipe(filter('**/*.css'))
    .pipe(reload({stream: true}))
});

gulp.task('copy', function() {
  return gulp.src(['app/index.html',
    'app/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/views/**/*.html'], {base: './app'})
    .pipe(gulp.dest('dist'))
});

gulp.task('copy:html', function() {
  return gulp.src(['app/index.html', 'app/views/**/*.html'], {base: './app'})
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}))
});

// clean output
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// watch files and reload
gulp.task('serve', function() {
  browserSync({
    notify: false,
    https: false,
    server: {
      baseDir: ['.tmp', 'dist']
    }
  });

  gulp.watch(['app/index.html', paths.html], ['copy:html']);
  gulp.watch(paths.sass, ['styles']);
  gulp.watch(paths.js, ['jshint']);
});

gulp.task('default', ['clean'], function(cb) {
  runSequence('styles', ['jshint', 'copy'], cb);
});