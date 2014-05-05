'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('server', function(next) {
  var connect = require('connect'),
      server = connect();
  server.use(connect.static(cfg.buildDir)).listen(cfg.port || 80, next);
});
