( function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', narrowItDownController)
	.service('MenuSearchService', menuSearchService)
	.directive('foundItems', foundItems);

	// Injecting services to the controller and service
	narrowItDownController.$inject = ['MenuSearchService'];
	menuSearchService.$inject = ['$http'];

	function narrowItDownController(MenuSearchService) {
		var controller = this;
		controller.found = null;
		controller.searchTerm = "";
		controller.finding = false;

		controller.narrowItDown = function (searchTerm) {
			if(searchTerm != null && searchTerm.length > 0) {
				controller.finding = true;
				MenuSearchService.getMatchedMenuItems(searchTerm)
				.then(function (response) {
					controller.found = response;
					controller.finding = false;
				})
				.catch(function (error) {
					console.log('Something went terribly wrong!\n' + error);
					controller.finding = false;
				});
			}
			else
				controller.found = [];
		}

		controller.removeItem = function (index) {
			controller.found.splice(index, 1);
		}
	}

	function menuSearchService($http) {
		this.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			})
			.then(function (result) {
				var foundItems = [];
				// Process result and only keep items that match
    			var menu_items = result.data.menu_items;

    			for(var i = 0; i < menu_items.length; i++) {
	    			if(menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
	    				foundItems.push(menu_items[i]);
	    			}
	    		}

	    		// Return processed items
	    		return foundItems;
			});
		};
	}

	function foundItems() {
		var ddo = {
			restrict: 'E',
			templateUrl: 'loader/itemsloaderindicator.template.html',
			scope: {
				found: '<',
				onRemove: '&',
				finding: '<'
			},
			controller: narrowItDownController,
			controllerAs: 'narrowItDownCtrl',
			bindToController: true
		}

		return ddo;
	}

})();