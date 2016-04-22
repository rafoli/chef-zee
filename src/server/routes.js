var chefPlaceRoutes = require('server/chef/places/routes');

module.exports = function routes(app) {
	app.use('/chef/places', chefPlaceRoutes);
};