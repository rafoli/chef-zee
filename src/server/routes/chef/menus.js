var mongoose = require('mongoose');
var ChefPlace = require('server/db/db').ChefPlace;
var ChefMenu = require('server/db/db').ChefMenu;
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
	ChefPlace.findOne( { '_id': req.params.id }, function(err, results) {
		if (err) { console.log(err) };

		var chef = results;

		console.log(chef);
		console.log('*******************');

		ChefMenu.find( { 'chef': req.params.id }, function(err, results2) {
			if (err) { console.log(err) };

			console.log(results2);
			console.log('*******************');

			chef.menus = results2;

			console.log(chef);

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