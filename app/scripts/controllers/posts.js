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
        function($scope, utils, post) {

            $scope.posts = [];
            post.query()
                .$promise.then(function(posts) {
                    $scope.posts = posts;
                    utils.markUp($scope.posts);
                });

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
