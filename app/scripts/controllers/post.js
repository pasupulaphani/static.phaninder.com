'use strict';

/**
 * @ngdoc function
 * @name myWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myWebApp
 */
angular.module('myWebApp')
    .controller(
        'PostCtrl',
        function($scope, $stateParams, $state, $location, post, utils, $twt) {

            if ($stateParams.id === '') {
                $state.go('404');
            }

            $scope.posts = post.query({
                id: $stateParams.id
            });

            $scope.posts.$promise.then(function() {
                utils.markUp($scope.posts);

                // instead use route resolve if not seo
                if ($stateParams.seo_url !== $scope.posts[0].seo_url) {
                    $location.path('/posts/' + $scope.posts[0]._id + '/' + $scope.posts[0].seo_url + '/');
                }
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
                tpl: 'social_networking'
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
