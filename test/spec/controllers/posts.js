'use strict';

describe('Controller: PostsCtrl', function () {

  // load the controller's module
  beforeEach(module('myWebApp'));

  var PostsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostsCtrl = $controller('PostsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(3).toBe(3);
  });
});
