( function () {
	'use strict';

	angular.module('LunchChecker', []).controller('LunchCheckController', lunchCheckController);

	lunchCheckController.$inject = ['$scope'];
	function lunchCheckController($scope) {
		$scope.dishes = "";
		$scope.checkLunch = function() {

			const dishesList = $scope.dishes.split(',');
			var numOfDishes = 0;

			for(var i = 0; i < dishesList.length; i++) {
				if(dishesList[i].trim().length > 0) {
					numOfDishes++;
				}
			}

			if(numOfDishes > 3) {
				$scope.message = "Too much!";
				$scope.status = "valid"
			}
			else if(numOfDishes > 0) {
				$scope.message = "Enjoy!";
				$scope.status = "valid"
			}
			else {
				$scope.message = "Please enter data first";
				$scope.status = "invalid"
			}
		}
	}
})();