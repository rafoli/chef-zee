var chefPlaceRoutes = require('server/routes/chef/places');
var chefMenuRoutes = require('server/routes/chef/menus');
var cors = require('cors');

module.exports = function routes(app) {
	app.use(cors());
	app.use('/chef/places', chefPlaceRoutes);
	app.use('/chef/menus', chefMenuRoutes);
};