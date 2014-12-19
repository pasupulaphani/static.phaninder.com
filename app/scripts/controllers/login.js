'use strict';

/**
 * @ngdoc function
 * @name myWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myWebApp
 */
angular.module('myWebApp')
    .controller('LoginCtrl', function($scope, $log, $location, auth) {

        var failed = function() {
            $scope.$emit('notify', {
                type: 'alert',
                msg: 'Invalid credentials'
            });
        };

        $scope.login = function() {
            auth.login($scope.email, $scope.password)
                .then(function(success) {
                    if(success) {
                        $location.path('/');
                    } else {
                        failed();
                    }
                });
        };

        $scope.authenticate = function(provider) {
            $log.warn('authenticate ' + provider);
        };
    });
