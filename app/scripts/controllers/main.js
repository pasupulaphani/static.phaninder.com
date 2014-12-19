'use strict';

/**
 * @ngdoc function
 * @name myWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myWebApp
 */
angular.module('myWebApp')
    .controller('MainCtrl', function($scope, $location, auth) {

        $scope.user = auth.user;

        $scope.logout = function() {
            auth.logout()
                .then(function(success) {
                    if (success) {
                        $location.path('/');
                    }
                });
        };

        $scope.notify = {
            show: false
        };

        $scope.$on('notify', function(event, data) {
            angular.extend($scope.notify, data);
            $scope.notify.show = true;
        });
    });
