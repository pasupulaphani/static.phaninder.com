'use strict';

describe('Controller: PostCtrl', function() {

    // load the controller's module
    beforeEach(module('myWebApp'));

    var PostCtrl,
        scope,
        state,
        id = 'about';

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $injector) {
        scope = $rootScope.$new();
        state = $injector.get('$state');
        PostCtrl = $controller('PostCtrl', {
            $scope: scope,
            id: id
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
        expect(3).toBe(3);
    });
});
