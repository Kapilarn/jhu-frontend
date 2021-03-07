(function() {
	'use strict';

	angular.module('myFirstApp', [])
	.controller('MyFirstController', function($scope) {
		$scope.name = "Kapilarn";
		$scope.sayHello = function() {
			return 'Hello, Coursera!';
		};
	});
})();