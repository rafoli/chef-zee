/*globals isttoApp*/

isttoApp.Controllers
  .controller("LogoutController", ["$scope",
    "localStorageService",
    "$window", function ($scope, Storage, $window) {

    $scope.clearToken = function () {
      Storage.clearAll();
      $window.location.href = '/?timestamp=' + Date.now()
    };

    $scope.clearToken();
  }]);
