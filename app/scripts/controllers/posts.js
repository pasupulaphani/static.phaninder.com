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
        })
    .controller(
        'PostsSearchCtrl',
        function($scope, $stateParams, $http, restEndPoint, utils) {

			$scope.posts = [];

            $http.get(restEndPoint + '/posts/', {
                    params: {
                        status: $stateParams.status
                    }
                })
                .then(function(resp) {
                    $scope.posts = resp.data;
                    utils.markUp($scope.posts);
                });

        });
