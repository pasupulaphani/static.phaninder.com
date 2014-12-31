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
        function($scope, $stateParams, $state, $location, post, utils, $twt, id) {

            if (id === '') {
                $state.go('404');
                return;
            }

            $scope.posts = [];

            post.query({
                    id: id
                })
                .$promise.then(function(posts) {

                    // populate data
                    $scope.posts = posts;
                    utils.markUp($scope.posts);

                    // instead use route resolve if not seo
                    if ($stateParams.seo_url !== $scope.posts[0].seo_url) {
                        $location.path('/posts/' + $scope.posts[0]._id + '/' + $scope.posts[0].seo_url + '/');
                    }
                });

            $scope.setStatus = function(status) {
                post.setStatus({
                    id: id,
                    status: status
                }).$promise.then(function() {

                    // success
                    $scope.posts[0].status = status;
                });
            };

            $scope.share = {
                tpl: ['about', 'contact'].indexOf(id) === -1 ? 'social_sharing' : 'social_networking',
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
        'PostEditCtrl',
        function($scope, $stateParams, $state, $location, post) {

            if ($stateParams.id === '') {
                $state.go('404');
                return;
            }

            var queryParams = {
                id: $stateParams.id
            };

            $scope.posts = [];

            post.query(queryParams)
                .$promise.then(function(posts) {

                    // populate data
                    $scope.posts = posts;
                });

            $scope.save = function() {

                // trigger input expicitly to bind updates to model
                angular.element('#post-preface').trigger('input');
                angular.element('#post-body').trigger('input');

                post.update(queryParams, $scope.posts[0])
                    .$promise.then(function() {

                        $location.path('/posts/' + $scope.posts[0]._id);
                    });
            };
        })
    .controller(
        'PostNewCtrl',
        function($scope, $state, $location, post) {

            $scope.posts = [{}];

            $scope.create = function() {

                // trigger input expicitly to bind updates to model
                angular.element('#post-preface').trigger('input');
                angular.element('#post-body').trigger('input');

                post.save($scope.posts[0])
                    .$promise.then(function(post) {

                        $location.path('/posts/' + post._id);
                    });
            };
        });
