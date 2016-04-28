var mongoose = require('mongoose');
var ChefPlace = require('server/db/db').ChefPlace;
var ChefMenu = require('server/db/db').ChefMenu;
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
	ChefPlace.findOne( { '_id': req.params.id }, function(err, results) {
		console.log(req.headers.authorization);
		if (err) { console.log(err) };

		var chef = results;

		ChefMenu.find( { 'chef': req.params.id }, function(err, results2) {
			if (err) { console.log(err) };

			chef.menus = results2;

			res.send( { place: chef });
		});
	});
});

router.post('/', function(req, res) {
	var menu = new ChefMenu(req.body);
	menu.save(function(err) {
		if (err) { console.log(err); }

		res.send('Menu saved');
	});
});

module.exports = router;