/*globals isttoApp*/
isttoApp.Filters
  .filter("parseDate", [function () {
    return function(value) {
      return Date.parse(value);
    };
}]);
