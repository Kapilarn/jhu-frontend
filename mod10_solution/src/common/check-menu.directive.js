(function () {
  "use strict";

  angular.module('common')
  .directive('checkMenu', CheckMenuDirective);

  CheckMenuDirective.$inject = ['UserService']
  function CheckMenuDirective(UserService) {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, modelCtrl) {
        function checkMenuItem(value) {
          UserService.getFavMenu(value).then(function (found) {
            modelCtrl.$setValidity('menuFound', found);
          });
          return value;
        }
        modelCtrl.$parsers.push(checkMenuItem);
      }
    };
  }
})();