'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('myWebApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should have login method', function () {
    expect(scope.login).toBeDefined();
  });
});
