describe('User service', function () {
  var userService, $httpBackend, ApiPath;
  var existingMenuNumber = "D17", unknownMenuNumber = "BB8";

  beforeEach(function () {
  	module('common');
  	
  	inject(function ($injector) {
  	  userService = $injector.get('UserService');
  	  $httpBackend = $injector.get('$httpBackend');
  	  ApiPath = $injector.get('ApiPath');
  	});
  });

  it("should return menu item found for " + existingMenuNumber, function () {
  	$httpBackend.whenGET(ApiPath + "/menu_items/" + existingMenuNumber + ".json").respond(true);
  	userService.getFavMenu(existingMenuNumber).then(function (response) {
  	  expect(response).toEqual(true);
  	});
  	$httpBackend.flush();
  });

  it("should return menu item not found for " + unknownMenuNumber, function () {
  	$httpBackend.whenGET(ApiPath + "/menu_items/" + unknownMenuNumber + ".json").respond(false);
  	userService.getFavMenu(unknownMenuNumber).then(function (response) {
  	  expect(response).toEqual(false);
  	});
  	$httpBackend.flush();
  });
});