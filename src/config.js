import angular from 'angular';
import uiRouter from 'angular-ui-router';
import chefFactory from 'public/factories/chef-factory';
import chefController from 'public/chef/chef';

const app = angular.module('app', [uiRouter, chefFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('chef', {
			url: '/',
			template: require('public/chef/chef.html'),
			controller: chefController
		})
		.state('about', {
			url: '/about',
			template: require('public/about/about.html')
		});

	$locationProvider.html5Mode(true);	
});

export default app;