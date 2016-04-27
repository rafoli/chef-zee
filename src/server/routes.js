var chefPlaceRoutes = require('server/routes/chef/places');
var chefMenuRoutes = require('server/routes/chef/menus');
var loginRoutes = require('server/routes/login');
var cors = require('cors');

module.exports = function routes(app) {
	app.use(cors());
	app.use('/chef/places', chefPlaceRoutes);
	app.use('/chef/menus', chefMenuRoutes);
	app.use('/login', loginRoutes);
};