'use strict';

/**
 * @ngdoc service
 * @name myWebApp.myCSRF
 * @description
 * # myCSRF
 * Provider in the myWebApp.
 */
angular.module('myWebApp')
    .provider(
        'myCSRF',
        function() {

            var headerName = 'X-XSRF-TOKEN';
            var cookieName = 'XSRF-TOKEN';
            var allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

            this.setHeaderName = function(n) {
                headerName = n;
            };
            this.setCookieName = function(n) {
                cookieName = n;
            };
            this.setAllowedMethods = function(n) {
                allowedMethods = n;
            };
            this.$get = ['$cookies', function($cookies) {
                return {
                    'request': function(config) {
                        if (allowedMethods.indexOf(config.method) !== -1) {
                            // Read the cookie and set the header
                            config.headers[headerName] = $cookies[cookieName];
                        }
                        return config;
                    }
                };
            }];
        });
