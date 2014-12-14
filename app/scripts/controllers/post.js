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
        function($scope, $routeParams, $location, post, utils, $twt) {
            $scope.posts = post.query({
                id: $routeParams.id
            });

            $scope.posts.$promise.then(function() {
                utils.markUp($scope.posts);

                // instead use route resolve
                $location.path('/posts/' + $scope.posts[0]._id + '/' + $scope.posts[0].seo_url)
            });

            $scope.share = {
                tpl: 'social_sharing',
                twt: function() {
                    $twt.intent('tweet', {
                        text: 'Adventures at NodeCoptor',
                        url: 'http://localhost:9000/#/posts/sdfg3/undefined',
                        hashtags: 'phaninder.com'
                    });
                }
            };

        })
    .controller(
        'AboutCtrl',
        function($scope, utils, about) {

            $scope.posts = about.query({
                id: 'about'
            });

            $scope.posts.$promise.then(function() {
                utils.markUp($scope.posts);
            });

            $scope.share = {
                tpl: 'social_sharing'
            };
        })
    .controller(
        'ContactCtrl',
        function($scope, utils, contact) {

            $scope.posts = contact.query({
                id: 'contact'
            });

            $scope.posts.$promise.then(function() {
                utils.markUp($scope.posts);
            });

            $scope.share = {
                tpl: 'social_networking'
            };
        });
