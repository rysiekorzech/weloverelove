

module.exports = function(config, Handlebars) {

  // var config = this.config
  require('./link-to')(config, Handlebars);
  require('./dates')(Handlebars);

  // partials
  require('./partials')(Handlebars);
};
