/*globals isttoApp, ApplicationController*/

isttoApp.Controllers
  .controller("ApplicationController", ["$rootScope", "$scope", "localStorageService", function ($rootScope, $scope, Storage) {

  	$scope.isAdmin = function() {
      var role = Storage.get("authRole")
      return (role);
    };

    $scope.isChef = function (place) {
      var userId = Storage.get("authUserId")
    	if (userId && place && place.user) {
    		return (userId == place.user._id);
    	}
      	return false;
    }

    $scope.addToCart = function(menu){
        if (!$scope.cart) {
          $scope.cart = {};
          $scope.cart.items = [];
        } 
        $scope.cart.items.push( { 'name': menu.name, 'price': menu.price} );
    }

    $scope.deleteFromCart = function (item) {
      if ($scope.cart) {
        $scope.cart.items.splice($scope.cart.items.indexOf(item),1);
      }
    };

    $scope.getCartSize = function(){
        if ($scope.cart && $scope.cart.items.length > 0) {
          return $scope.cart.items.length;
        }
        else {
          return "";
        } 
    }

    $scope.getTotal = function(){
        var total = 0;
        if ($scope.cart) {
          for(var i = 0; i < $scope.cart.items.length; i++){
              var item = $scope.cart.items[i];
              total += Number(item.price);
          }
        }
        return total;
    }


  }]);
