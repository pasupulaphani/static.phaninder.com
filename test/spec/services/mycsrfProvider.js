'use strict';

describe('Service: myCSRF', function() {

    // load the service's module
    beforeEach(module('myWebApp'));

    // instantiate service
    var myCSRF;
    beforeEach(inject(function(_myCSRF_) {
        myCSRF = _myCSRF_;
    }));

    it('should match api specs', function() {
        expect(myCSRF.request).toBeDefined();
    });

    describe('Setting CSRF headers for methods', function() {

        var config = {};

        beforeEach(function() {
            config = {
                headers: {}
            };
        });

        it('should not set for OPTIONS', function() {
            config.method = 'OPTIONS';
            config = myCSRF.request(config);
            expect(config.headers.hasOwnProperty('X-XSRF-TOKEN')).toBe(false);
        });

        it('should set for GET', function() {
            config.method = 'GET';
            config = myCSRF.request(config);
            expect(config.headers.hasOwnProperty('X-XSRF-TOKEN')).toBe(true);
        });

        it('should set for POST', function() {
            config.method = 'POST';
            config = myCSRF.request(config);
            expect(config.headers.hasOwnProperty('X-XSRF-TOKEN')).toBe(true);
        });

        it('should set for PUT', function() {
            config.method = 'PUT';
            config = myCSRF.request(config);
            expect(config.headers.hasOwnProperty('X-XSRF-TOKEN')).toBe(true);
        });

        it('should set for PATCH', function() {
            config.method = 'PATCH';
            config = myCSRF.request(config);
            expect(config.headers.hasOwnProperty('X-XSRF-TOKEN')).toBe(true);
        });

        it('should set for DELETE', function() {
            config.method = 'DELETE';
            config = myCSRF.request(config);
            expect(config.headers.hasOwnProperty('X-XSRF-TOKEN')).toBe(true);
        });

    });

});
