'use strict';

/**
 * @ngdoc function
 * @name myWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myWebApp
 */
angular.module('myWebApp')
    .controller('MainCtrl', function($rootScope, $scope, $location, postTypes, auth) {

        // bind data
        $scope.user = auth.user;
        $scope.postTypes = postTypes;

        // public api
        $scope.logout = function() {
            auth.logout()
                .then(function(success) {
                    if (success) {
                        $location.path('/');
                    }
                });
        };

        // notification stuff
        $scope.notify = {
            show: false
        };

        $scope.$on('notify', function(event, data) {
            angular.extend($scope.notify, data);
            $scope.notify.show = true;
        });

        $rootScope.$on('$stateChangeStart', function() {
            $scope.notify.show = false;
        });
    });
