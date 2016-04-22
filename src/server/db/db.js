var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zee');

var ChefPlace = mongoose.model('ChefPlace', {
	name: String
});

module.exports.ChefPlace = ChefPlace;