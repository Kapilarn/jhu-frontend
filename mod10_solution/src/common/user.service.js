(function () {
  "use strict";

  angular.module('common')
  .service('UserService', UserService);

  UserService.$inject = ['$http', 'ApiPath'];
  function UserService($http, ApiPath) {
    var service = this;

    service.userInfo = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      menuNumber: '',
      favMenu: null,
      registered: false
    };

    service.getUserInfo = function () {
      return service.userInfo;
    };

    service.register = function () {
      service.userInfo.registered = true;
    };

    service.getFavMenu = function (menuNumber) {
      return $http.get(ApiPath + '/menu_items/' + menuNumber + '.json')
      .then(function (response) {
        if (response.data) {
          service.userInfo.favMenu = response.data;
          return true;
        }
        else {
          return false;
        }
      })
      .catch(function (error) {
        return false;
      });
    };

    service.getFavMenuImgPath = function () {
      return ApiPath + '/images/' + service.userInfo.favMenu.short_name;
    };
  }
})();