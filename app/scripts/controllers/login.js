'use strict';

/**
 * @ngdoc function
 * @name myWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myWebApp
 */
angular.module('myWebApp')
  .controller('LoginCtrl', function ($scope, $log) {
    $scope.login = function (argument) {
    	$log.warn("login clicked")
    }
  });
