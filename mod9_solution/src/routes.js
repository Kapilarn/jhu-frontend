( function () {
	'use strict';

	angular.module('MenuApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		// home view state
		.state('home', {
			url: '/',
			templateUrl: 'templates/home.template.html'
		})
		// categories view state
		.state('categories', {
			url: '/categories',
			templateUrl: 'templates/categories.template.html',
			controller: 'CategoriesController as catCtrl',
			resolve: {
				categories: ['MenuDataService', function (MenuDataService) {
					return MenuDataService.getAllCategories();
				}]
			}
		})
		// menu items view state
		.state('items', {
			url: '/items/{short_name}',
			templateUrl: 'templates/items.template.html',
			controller: 'ItemsController as itemCtrl',
			resolve: {
				items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
					return MenuDataService.getItemsForCategory($stateParams.short_name);
				}]
			}
		});
	}
})();