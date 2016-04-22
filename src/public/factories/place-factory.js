import _ from 'lodash';
import angular from 'angular';

const placeFactory = angular.module('app.placeFactory', [])

.factory('placeFactory', ($http) => {

    function getPlaces($scope) {
        $http.get('/chef/places').success(response =>  {
            $scope.places = response.places;
        });
    }

    function createPlace($scope) {
        if (!$scope.placeNameInput) { return; }
        if (!$scope.placeLogoInput) { return; }

        $http.post('/chef/places', {
            name: $scope.placeNameInput,
            logo: $scope.placeLogoInput
        }).success(response => {
            getPlaces($scope);
            $scope.placeNameInput = '';
            $scope.placeLogoInput = '';
        });
	}

	return {
        getPlaces,
        createPlace
	}
}); 

export default placeFactory;