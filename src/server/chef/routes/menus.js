var mongoose = require('mongoose');
var ChefMenu = require('server/db/db').ChefMenu;
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
	ChefMenu.find( { 'chef': req.params.id }, function(err, results) {
		if (err) { console.log(err) };

		res.send( { menus: results });
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