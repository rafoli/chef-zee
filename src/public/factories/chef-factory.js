import _ from 'lodash';
import angular from 'angular';

const chefFactory = angular.module('app.chefFactory', [])

.factory('chefFactory', ($http) => {

    function getPlaces($scope) {
        $http.get('/chef/places').success(response =>  {
            $scope.places = response.places;
        });
    }

    function createPlace($scope) {
        if (!$scope.placeNameInput) { return; }

        $http.post('/chef/places', {
            name: $scope.placeNameInput
        }).success(response => {
            getPlaces($scope);
            $scope.placeNameInput = '';
        });
	}

	return {
        getPlaces,
        createPlace
	}
}); 

export default chefFactory;