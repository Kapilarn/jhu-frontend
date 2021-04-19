(function () {
  "use strict";

  angular.module('public')
  .controller('SignUpController', SignUpController);
  
  SignUpController.$inject = ['UserService'];
  function SignUpController(UserService) {
	  var $ctrl = this;

    $ctrl.userInfo = UserService.getUserInfo();
	  $ctrl.register = function () {
	    UserService.register($ctrl.userInfo.menuNumber);
	  }
  }
})();