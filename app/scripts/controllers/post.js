'use strict';

/**
 * @ngdoc function
 * @name angappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angappApp
 */
angular.module('angappApp')
    .controller(
        'PostCtrl',
        function($scope, $routeParams, $location, post, utils) {
            $scope.posts = post.query({
                id: $routeParams.id
            });

            $scope.posts.$promise.then(function() {
                utils.markUp($scope.posts);

                // instead use route resolve
                $location.path('/posts/'+$scope.posts[0]._id+'/'+$scope.posts[0].seo_url)
            });

            $scope.findMe = 'social_sharing';
        })
    .controller(
        'AboutCtrl',
        function($scope, about) {

            $scope.posts = about.query({
                id: 'about'
            });

            $scope.posts.$promise.then(function() {
                utils.markUp($scope.posts);
            });

            $scope.findMe = 'social_networking';
        })
    .controller(
        'ContactCtrl',
        function($scope, contact) {

            $scope.posts = contact.query({
                id: 'contact'
            });

            $scope.posts.$promise.then(function() {
                utils.markUp($scope.posts);
            });

            $scope.findMe = 'social_networking';
        });
