'use strict';

// path config
var cfg = require('../gulp_config');

var gulp = require('gulp');
var gif = require('gulp-if');
var rename = require('gulp-rename');
// rework
var rework = require('gulp-rework');
var npm = require('rework-npm');
var vars = require('rework-vars');
var dedupe = require('rework-deduplicate');
var breakpoints = require('rework-breakpoints');

var calc = require('rework-calc');
var color = require('rework-color-function');
var variants = require('rework-font-variant');
var hex = require('rework-hex-alpha');

var inherit = require('rework-inherit');

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');


module.exports = gulp.task('styles', function() {

  gulp.src(cfg.app.stylesIndex)
    .pipe(rework(
    npm(), // future spec
    vars(), // enhancements
    dedupe(),
    breakpoints,
    calc,
    variants,
    hex,
    color,
    inherit()))

    // prefix, optimize, rename
    .pipe(autoprefixer("last 2 versions", "> 1%", "ie 10"))
    .pipe(gulp.dest(cfg.buildDir + '/assets/css'))
    .pipe(gif(cfg.env === 'production', csso(true)))
    //.pipe(rename({suffix: '.min'}))
    // dest
    .pipe(gif(cfg.env === 'production', gulp.dest(cfg.compileDir + '/assets/css')));

});
