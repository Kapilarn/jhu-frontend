( function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', toBuyController)
	.controller('AlreadyBoughtController', alreadyBoughtController)
	.service('ShoppingListCheckOffService', shoppingListCheckOffService)
	.filter('price', PriceFilter);

	// Injecting service to controllers
	toBuyController.$inject = ['ShoppingListCheckOffService'];
	alreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

	function toBuyController(ShoppingListCheckOffService) {
		this.toBuyItems = ShoppingListCheckOffService.getBuyList();

		this.addItemAsBought = function(itemIndex) {
			ShoppingListCheckOffService.moveItemsToBought(itemIndex);
		};
	}

	function alreadyBoughtController(ShoppingListCheckOffService) {
		this.boughtItems = ShoppingListCheckOffService.getBoughtList();
	}

	function shoppingListCheckOffService() {
		var toBuyList = [
			{name: "Tomatoes", quantity: 20, pricePerItem: 0.5},
			{name: "Carrots", quantity: 25, pricePerItem: 0.25},
			{name: "Cucumbers", quantity: 10, pricePerItem: 0.45},
			{name: "Corns", quantity: 15, pricePerItem: 1.50},
			{name: "Brocolli", quantity: 5, pricePerItem: 0.75},
			{name: "Spinaches", quantity: 30, pricePerItem: 0.60},
			{name: "Cauliflowers", quantity: 12, pricePerItem: 0.35},
			{name: "Mushrooms", quantity: 50, pricePerItem: 0.20}
		];
		this.getBuyList = function() {
			return toBuyList;
		}

		var boughtList = [];
		this.getBoughtList = function() {
			return boughtList;
		}

		this.moveItemsToBought = function(itemIndex) {
			// Removing item from buy list and adding it to bought list
			boughtList.push(toBuyList.splice(itemIndex, 1)[0]);
		}
	}

	function PriceFilter() {
		return function(totalPrice, symbol) {
			return symbol + totalPrice.toFixed(2);
		}
	}
})();