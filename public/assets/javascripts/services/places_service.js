/*globals isttoApp, btoa*/
isttoApp.Services
  .service("PlacesService", ["lodash",
    "$http",
    "$q",
    "localStorageService", function (_, $http, $q, Storage) {

    return {
      createPlace: function (name, description, moreDescription, logo) {
        return $http({
          method: "POST",
          url: "/chef/places",
          data: { 'name' : name, 'description' : description, 'moreDescription' : moreDescription, 'logo' : logo },
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      },
      updatePlace: function (place) {
        return $http({
          method: "PUT",
          url: "/chef/places/" + place._id,
          data: place,
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      },
      places: function () {
        return $http({
          method: "GET",
          url: "/chef/places",
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      },

      place: function (placeId) {
        return $http({
          method: "GET",
          url: "/chef/menus/" + placeId,
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      }, 

      createMenu: function (name, description, price, image, placeId) {
        return $http({
          method: "POST",
          url: "/chef/menus",
          data: { 'name' : name, 'description' : description, 'price' : price, 'image' : image, place : placeId },
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      },      
      updateMenu: function (menu) {
        return $http({
          method: "PUT",
          url: "/chef/menus/" + menu._id,
          data: menu,
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      },
      deleteMenu: function (menu) {
        return $http({
          method: "DELETE",
          url: "/chef/menus/" + menu._id,
          data: menu,
          headers: { "Authorization": "Basic " + btoa(Storage.get("authToken") + ":") }
        });
      }      
    };
  }]);
