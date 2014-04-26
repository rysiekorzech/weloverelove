
var cfg = require('./gulp_config');

// flow utilities
var runSequence = require('run-sequence');

// gulp core
var gulp = require('gulp');
var livereload = require('gulp-livereload');

require('./tasks/clean');
require('./tasks/fetch_content');
require('./tasks/styles');
require('./tasks/metalsmith');
require('./tasks/scripts');
require('./tasks/images');
require('./tasks/assets');
require('./tasks/html');

require('./tasks/staticsvr');


gulp.task('watch', ['staticsvr'], function() {
  var server = livereload();
  gulp.watch(cfg.buildDir + '/**').on('change', function(file) {
      server.changed(file.path);
  });

  // Watch for new styles
  gulp.watch(cfg.app.styles, ['styles']);
  // Watch src js files
  gulp.watch(cfg.app.appScripts, ['scripts']);
  // Watch test.spec.js files
  gulp.watch(cfg.app.specs, ['scripts']);
  // Watch images
  gulp.watch(cfg.app.images, ['images']);
  // Watch others assets, pretty fast so grouped
  gulp.watch(cfg.app.fonts, ['assets']);
  gulp.watch(cfg.app.meta, ['assets']);
  gulp.watch(cfg.app.icons, ['assets']);

  // Watch for new content
  gulp.watch(cfg.app.contentDirWatch, ['fetchContent']);

  // Watch for new content
  gulp.watch(cfg.app.markdown, ['build']);
  // Watch for new template design
  gulp.watch(cfg.app.buildHelpers, ['build']);
  gulp.watch(cfg.app.buildTemplates, ['build']);

})

gulp.task('build', function(callback) {
  runSequence('clean', ['metalsmith'],
              ['scripts','styles','images','assets','html'],
              callback);
});

gulp.task('publish', function(callback) {
  cfg.env = 'production';
  runSequence('clean', ['metalsmith'],
              ['scripts','styles','images','assets','html'],
              callback);
});


gulp.task('default', ['build'], function() {});

