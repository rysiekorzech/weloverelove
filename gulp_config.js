
/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  env: 'development',
  baseURL: 'http://weloverelove.com',
  port: 9090,
  buildDir: 'build',
  compileDir: 'www', // to meet cordova convention

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */

  app: {
    contentDir:        '/Users/wik/googledrive/dreams/weloverelove/_content/',
    contentDirWatch:   '/Users/wik/googledrive/dreams/weloverelove/_content/**/*',
    stylesIndex:       'src/style/main.css',
    styles:            ['src/style/**/*.css','src/js/modules/**/*.css'],
    html:              'build/**/*.html',
    images:            'src/images/**/*',
    icons:             'src/icons/**/*',
    fonts:             'src/fonts/**/*',
    meta:              'src/meta/**/*',
    indexHtml:         'www/index.html',
    appScripts:        'src/js/**/*.js',
    browserifyEntry:   'src/js/index.js',
    specs:             'test/**/*.spec.js',
    markdown:          'content/**/*.md',
    buildHelpers:      'templates/build/**/*.js',
    buildTemplates:    'templates/**/*.hbs',
    reload:            'build/index.html'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test: {
    js: [
      'test/lib/helper/**/*.js',
      //'src/modules/index.js',
      'test/**/*.spec.js',  // browserify
      // 'src/modules/index.js' see karma browserfiy in karma.conf
      // 'src/modules/**/*.html' compliing templates upfront
    ]
  },

  /**
   * Using this to around working with stuff that can't be
   * browserified. Fast way to get things working need to
   * browserify these modules.
   */
  vendor: {
    js: [
      'src/js/vendor/imagesloaded.pkgd.min.js',
      'src/js/vendor/masonry.pkgd.min.js'
    ],
    // Not sure when to use these, prefer this stuff closer together
    css: [
    ],
    assets: [
    ]
  },
};
