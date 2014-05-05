'use strict';

// GULP CONFIG
var cfg = require('../gulp_config');

var gulp = require('gulp');
//  handlebars
var Handlebars = require('handlebars');
require('../templates/helpers')(cfg, Handlebars);

// metalsmith
var metadata = require('../metalsmith_config');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var metadata = require('metalsmith-metadata');
var excerpts = require('metalsmith-excerpts');
var collections = require('metalsmith-collections');


module.exports = gulp.task('metalsmith', function(cb) {

  var m = Metalsmith(__dirname);
  m.source('../content');

  m.use(metadata(metadata));

  m.use(collections({
    mainStory: {
      pattern: 'story/home/*.md',
      sortBy: 'flow'
    }
    // gridGallery: {
    //   pattern: 'collections/grid-gallery/*.md'
    // }
  }));

  m.use(excerpts());

  m.use(markdown({
    gfm: true,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true
  }));

  m.use(permalinks());

  m.use(templates({
    engine: 'handlebars',
    directory: '../templates'
  }));

  m.destination('../build');
  m.build(function(err) {
    if (err) return console.error(err);
    cb();
  });

});
