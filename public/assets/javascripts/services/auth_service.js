isttoApp.Services
  .service("AuthService", ["$http", function ($http) {
    function tokenAuth(token) {
      return {"Authorization": "Basic " + btoa(token + ":")};
    }

    return {
      getToken: function(user) {
        return $http({
          method: "GET",
          url: TT_API_PATH + "user/me",
          headers: { "Authorization": "Basic " + btoa(user.username + ":" + user.password) }
        });
      },

      validateToken: function (timestampToken, url) {
        if ((timestampToken === undefined) || (url === undefined)) {
          return false;
        }

        if ((url === '/') || (url === '/logout')) {
          return true;
        }

        var oneDay = 1000 * 60 * 60 * 24; // 24 hours
        var now = new Date().getTime();
        var betWeen = now - timestampToken;
        var days = betWeen / oneDay;

        return (days < 1) ? true : false;
      }
    };
  }]);
