var purify = require('purify-css');

var content = ['public/assets/javascripts/*.js', 'public/templates/**/*.html', 'public/*.html'];
var css = ['public/assets/stylesheets/*.css'];

var options = {
  minify: false
};

purify(content, css, options, function (purifiedAndMinifiedResult) {
  console.log(purifiedAndMinifiedResult);
});