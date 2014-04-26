
var fs = require('fs');

module.exports = function(Handlebars) {

  var partialsDirectories = [ __dirname + '/../partials', __dirname + '/../partials/svg'];

  partialsDirectories.forEach(function(partialsDir){

    var filenames = fs.readdirSync(partialsDir);

    filenames.forEach(function (filename) {
      var matches = /^([^.]+).hbs$/.exec(filename);
      if (!matches) {
        return;
      }
      var name = matches[1];
      var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
      Handlebars.registerPartial(name, template);
    });

  });
};


