var mongoose = require('mongoose');
var ChefPlace = require('server/db/db').ChefPlace;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	ChefPlace.find(function(err, results) {
		console.log(req.headers.authorization);
		if (err) { console.log(err) };

		res.send( { places: results });
	});
});

router.post('/', function(req, res) {
	var place = new ChefPlace(req.body);
	console.log(place);
	place.save(function(err) {
		if (err) { console.log(err); }

		res.send('Place saved');
	});
});

module.exports = router;