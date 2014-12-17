'use strict';

/**
 * @ngdoc function
 * @name myWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myWebApp
 */
angular.module('myWebApp')
    .controller('LoginCtrl', function($scope, $log, $http, restEndPoint) {

        $scope.login = function() {
            $http.post(restEndPoint + '/login', {
                    withCredentials: true,
                    email: $scope.email,
                    password: $scope.password
                })
                .then(function() {
                    $log.warn('logged in successfully');
                })
                .catch(function(response) {
                    $log.warn('log in failed');
                    $log.warn(response);
                });
        };

        $scope.authenticate = function(provider) {
            $log.warn('authenticate ' + provider);
        };
    });
