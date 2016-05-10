/*globals isttoApp*/

isttoApp.Controllers
  .controller("CartController", ["$scope",
    "CartService",
    "$location",
    "mySocket", function ($scope, AdminService, $location, $window, mySocket) {

    $scope.loading = true;
    $scope.alert = "Carregando opções...";

    $scope.$on('socket:error', function (ev, data) {
    	console.log(ev);
    	console.log(data);
    });

    $scope.$on('socket:cart', function (ev, data) {
    	console.log(ev);
    	console.log(data);
    });

  }]);
