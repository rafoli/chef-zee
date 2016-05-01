var mongoose = require('mongoose');
var User = require('server/db/db').User;
var ChefPlace = require('server/db/db').ChefPlace;
var ChefMenu = require('server/db/db').ChefMenu;
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
	ChefPlace
		.findOne( { '_id': req.params.id })
		.populate('user')
		.exec( function(err, place) {
			if (err) { console.log(err) };

			ChefMenu.find( { 'place': req.params.id }, function(err, menus) {
				if (err) { console.log(err) };

				place.menus = menus;

				console.log(place);

				res.send( { place: place });
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

router.put('/:id', function(req, res) {
	ChefMenu.findOne( { '_id': req.params.id }, function(err, menu) {		

		menu.name = req.body.name;
		menu.price = req.body.price;
		menu.image = req.body.image;

		menu.save(function(err) {
			if (err) { console.log(err); }

			res.send('Menu saved');
		});
	});
});

module.exports = router;