import angular from 'angular';
import uiRouter from 'angular-ui-router';
import placeFactory from 'public/factories/place-factory';
import placeController from 'public/chef/place/place';
import menuFactory from 'public/factories/menu-factory';
import menuController from 'public/chef/menu/menu';


const app = angular.module('app', [uiRouter, placeFactory.name, menuFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('chef', {
			url: '/',
			template: require('public/chef/place/place.html'),
			controller: placeController
		})
		.state('menu', {
			url: '/chef/:chefId',
			template: require('public/chef/menu/menu.html'),
			controller: menuController
		})
		.state('about', {
			url: '/about',
			template: require('public/about/about.html')
		});

	$locationProvider.html5Mode(true);	
});

export default app;