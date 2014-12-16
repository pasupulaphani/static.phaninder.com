'use strict';

/**
 * @ngdoc function
 * @name myWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myWebApp
 */
angular.module('myWebApp')
  .controller(
    'MainCtrl',
    function($scope, post) {

      $scope.posts = post.query();
  });
