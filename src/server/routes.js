var chefPlaceRoutes = require('server/chef/routes/places');
var chefMenuRoutes = require('server/chef/routes/menus');

module.exports = function routes(app) {
	app.use('/chef/places', chefPlaceRoutes);
	app.use('/chef/menus', chefMenuRoutes);
};