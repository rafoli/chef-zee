import _ from 'lodash';
import angular from 'angular';

const loginFactory = angular.module('app.loginFactory', [])

.factory('loginFactory', ($http) => {

    function login($location, $rootScope, $scope, chefId) {

        if (!$scope.username) { return; }
        if (!$scope.password) { return; }

        $http.post('/login', {
            username: $scope.username,
            password: $scope.password
        }).success(response => {
            $rootScope.user = response;
            $location.url('/');
        });
	}

	return {
        login
	}
}); 

export default loginFactory;