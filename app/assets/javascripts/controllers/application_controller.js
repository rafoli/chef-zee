/*globals isttoApp, ApplicationController*/

isttoApp.Controllers
  .controller("ApplicationController", ["$rootScope", "$scope", function ($rootScope, $scope) {

  	$scope.isAdmin = function() {
      return ($rootScope.role);
    };

    $scope.isChef = function (place) {
      return $rootScope.userId = place.user._id;
    }


  }]);
