'use strict';

describe('Controller: PostCtrl', function () {

  // load the controller's module
  beforeEach(module('myWebApp'));

  var PostCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostCtrl = $controller('PostCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(3).toBe(3);
  });
});
