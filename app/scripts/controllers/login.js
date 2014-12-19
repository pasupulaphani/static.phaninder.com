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

        $scope.login = function() {
            auth.login($scope.email, $scope.password)
                .then(function () {
                    $location.path('/');
                });
        };

        $scope.authenticate = function(provider) {
            $log.warn('authenticate ' + provider);
        };
    });
