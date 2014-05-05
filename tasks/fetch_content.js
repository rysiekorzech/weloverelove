'use strict';

// path config
var cfg = require('../gulp_config');

var runSequence = require('run-sequence');

var gulp = require('gulp');
var cache = require('gulp-cached');
var imagemin = require('gulp-imagemin');
var gif = require('gulp-if');

module.exports = gulp.task('fetchContent', function(callback) {
  runSequence(['mdContent'],
              callback);
});


var markdownContent = cfg.app.contentDir + 'content/**/*.md';

gulp.task('mdContent', function() {
  //console.log(markdownContent);
  return gulp.src(markdownContent)
    .pipe(gulp.dest('content'));
});

