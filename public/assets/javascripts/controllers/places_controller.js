/*globals isttoApp*/

isttoApp.Controllers
  .controller("PlacesController", ["$scope",
    "PlacesService",
    "$location",
    "$window",
    'mySocket', function ($scope, PlacesService, $location, $window) {

    $scope.loading = true;
    $scope.alert = "Carregando opções...";

    $scope.isEditingPlace = function (place) {
      var result = place.hasOwnProperty('editing') && place.editing == true
      return result;
    };

    $scope.editPlace = function (place) {
      place.editing = true;
    };

    $scope.cancelPlace = function (place) {
      place.editing = false;
    };

    var places = function () {
      PlacesService.places().then(function (response) {
        $scope.places = response.data.places;
        $scope.loading = false;
        $window.scrollTo(0, 0);
      }, function () {
        $location.path("/logout");
      });
    };
    places();

    $scope.goTo = function (placeId) {
      $location.path("/place/" + placeId);
    };

    $scope.createPlace = function () {

      var place = PlacesService.createPlace(
                  $scope.params.placeName, 
                  $scope.params.placeDescription, 
                  $scope.params.placeMoreDescription, 
                  $scope.params.placeLogo
                );

      place.then(function (response) {
        $scope.params.placeName = '';
        $scope.params.placeDescription = ''; 
        $scope.params.placeMoreDescription = '';       
        places();
      }, function () {
        $scope.showError = true;
      });
    };

    $scope.updatePlace = function (place) {

      var place = PlacesService.updatePlace(place);

      place.then(function (response) {
        places();
      }, function () {
        $scope.showError = true;
      });
    };

  }]);
