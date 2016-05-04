var mongoose = require('mongoose');
var ChefPlace = require('server/db/db').ChefPlace;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	ChefPlace
		.find()
		.populate('user')
		.exec( function(err, places) {
			if (err) { console.log(err) };

			res.send( { places: places });
		});
});

router.post('/', function(req, res) {
	var place = new ChefPlace(req.body);
	place.save(function(err) {
		if (err) { console.log(err); }

		res.send('Place saved');
	});
});

router.put('/:id', function(req, res) {
	ChefPlace.findOne( { '_id': req.params.id }, function(err, place) {	

		place.name = req.body.name;
		place.description = req.body.description;
		place.moreDescription = req.body.moreDescription;
		place.logo = req.body.logo;

		place.save(function(err) {
			if (err) { console.log(err); }

			res.send('Place saved');
		});
	});
});

module.exports = router;