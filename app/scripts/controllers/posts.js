'use strict';

/**
 * @ngdoc function
 * @name myWebApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the myWebApp
 */
angular.module('myWebApp')
  .controller(
    'PostsCtrl',
    function($scope, post) {

      $scope.posts = post.query();
  });
