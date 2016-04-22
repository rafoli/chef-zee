import _ from 'lodash';
import angular from 'angular';

const menuFactory = angular.module('app.menuFactory', [])

.factory('menuFactory', ($http) => {

    function getMenus($scope, chefId) {
        $http.get('/chef/menus/' + chefId).success(response =>  {
            $scope.menus = response.menus;
        });
    }

    function createMenu($scope, chefId) {
        if (!$scope.menuNameInput) { return; }
        if (!$scope.menuImageInput) { return; }
        if (!$scope.menuPriceInput) { return; }

        $http.post('/chef/menus', {
            name: $scope.menuNameInput,
            image: $scope.menuImageInput,
            price: $scope.menuPriceInput,
            chef: chefId 
        }).success(response => {
            getMenus($scope);
            $scope.menuNameInput = '';
            $scope.menuImageInput = '';
            $scope.menuPriceInput = '';
        });
	}

	return {
        getMenus,
        createMenu
	}
}); 

export default menuFactory;