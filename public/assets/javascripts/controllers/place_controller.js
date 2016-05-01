/*globals isttoApp*/

isttoApp.Controllers
  .controller("PlaceController", ["$rootScope", "$scope",
    "$routeParams",
    "PlacesService",
    "$location", function ($rootScope, $scope, $routeParams, PlacesService, $location) {

    $scope.loading = true;
    $scope.alert = "Carregando opções...";

    $scope.isEditingMenu = function (menu) {
      var result = menu.hasOwnProperty('editing') && menu.editing == true
      return result;
    };

    $scope.editMenu = function (menu) {
      menu.editing = true;
    };

    $scope.cancelMenu = function (menu) {
      menu.editing = false;
    };

    var place = function() {
      PlacesService.place($routeParams.placeId).then(function (response) {
        $scope.place = response.data.place;
        $scope.loading = false;

      }, function () {
        $location.path("/logout");
      });
    }
    place();

    $scope.createMenu = function () {

      var menu = PlacesService.createMenu(
                  $scope.params.menuName, 
                  $scope.params.menuDescription, 
                  $scope.params.menuPrice, 
                  $scope.params.menuImage,
                  $routeParams.placeId  
                );

      menu.then(function (response) {
        place();
      }, function () {
        $scope.showError = true;
      });
    };

    $scope.updateMenu = function (menu) {

      var menu = PlacesService.updateMenu(menu);

      menu.then(function (response) {
        place();
      }, function () {
        $scope.showError = true;
      });
    };   

  }]);
