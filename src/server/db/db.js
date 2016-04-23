var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://db_1:27017/zee');

// Place
var ChefPlaceSchema = new Schema({
	name: String,
	logo: String,
	menus: [{type: Schema.ObjectId, ref: 'ChefMenu'}]
});
var ChefPlace = mongoose.model('ChefPlace', ChefPlaceSchema);

// Menu
var ChefMenuSchema = new Schema({
	name: String,
	image: String,
	price: String,
	chef: { type:Schema.ObjectId, ref:"ChefPlace", childPath:"menus" }
});
var ChefMenu = mongoose.model('ChefMenu', ChefMenuSchema);

module.exports.ChefMenu = ChefMenu;
module.exports.ChefPlace = ChefPlace;