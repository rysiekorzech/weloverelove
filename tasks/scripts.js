'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var concat = require('gulp-concat');
var gif = require('gulp-if');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

// scripts browserify
var browserify = require('gulp-browserify');
var shim = require('browserify-shim');
var brfs = require('brfs');
var debowerify = require('debowerify');
// standard stuff
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
//var coffee = require('gulp-coffee');

gulp.task('lint', function(){
  return gulp.src(cfg.app.appScripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

module.exports = gulp.task('scripts', ['browserify', 'vendorJS'], function() {
  return gulp.src([
      'build/assets/js/process/vendorJS.js',
      'build/assets/js/process/browserified.js',
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/assets/js'))
    //.pipe(gif(cfg.env === 'production', rename({suffix: '.min'})))
    .pipe(gif(cfg.env === 'production', uglify()))
    .pipe(gif(cfg.env === 'production', gulp.dest('www/assets/js')));
});

gulp.task('browserify', function() {
  return gulp.src(cfg.app.browserifyEntry)
    .pipe(browserify({
      insertGlobals : false,
      debug: (!cfg.env === 'production'),
      shim: {
        'responsive-nav': {
          path: 'node_modules/responsive-nav/responsive-nav.js',
          exports: 'responsiveNav'
        },
        'smooth-scroll': {
          path: 'node_modules/smooth-scroll/smooth-scroll.js',
          exports: 'smoothScroll'
        },
        'picturefill': {
          path: 'node_modules/picturefill/src/picturePolyfill.js',
          exports: 'picturePolyfill'
        }
        // 'imagesloaded': {
        //   path: 'node_modules/imagesloaded/imagesloaded.js',
        //   exports: 'imagesloaded'
        // }
      }
    }))
    .pipe(concat('browserified.js'))
    .pipe(gulp.dest(cfg.buildDir + '/assets/js/process'));
    //.pipe(rename({suffix: '.min'}))
    // .pipe(gif(cfg.env === 'production', uglify()))
    // .pipe(gif(cfg.env === 'production', gulp.dest(cfg.compileDir + '/assets/js')));
});


// Just in case browserify shim does not work
gulp.task('vendorJS', function() {
  return gulp.src(cfg.vendor.js)
    .pipe(concat('vendorJS.js'))
    .pipe(gulp.dest('build/assets/js/process'));
});
