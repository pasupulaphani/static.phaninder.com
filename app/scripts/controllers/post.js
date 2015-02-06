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
        function($scope, $stateParams, $state, $location, utils, post, id) {

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

                    $scope.posts[0].full_path = '/posts/' + $scope.posts[0]._id;

                    if ($scope.posts[0].seo_url && $scope.posts[0].seo_url !== '') {
                        $scope.posts[0].full_path = $scope.posts[0].full_path + '/' + $scope.posts[0].seo_url;
                    }

                    $scope.posts[0].fq_url = $location.protocol() + '://' + $location.host() +
                        ($location.port() === 80 ? '' : ':' + $location.port()) +
                        $scope.posts[0].full_path;

                    // instead use route resolve if not seo
                    if ($stateParams.seo_url !== $scope.posts[0].seo_url && $scope.posts[0].seo_url !== '') {
                        $location.path($scope.posts[0].full_path);
                    }

                    $scope.$emit('setPageInfo', posts[0]);
                    utils.markUp($scope.posts);
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

            $scope.share_tpl = ['about', 'contact'].indexOf(id) === -1 ? 'social_sharing' : 'social_networking';

        })
    .controller(
        'PostEditCtrl',
        function($scope, $log, $stateParams, $state, $location, utils, post) {

            if ($stateParams.id === '') {
                $state.go('404');
                return;
            }

            var queryParams = {
                id: $stateParams.id
            };

            var failed = function(msg) {
                $scope.$emit('notify', {
                    type: 'alert',
                    msg: msg
                });
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
                    }, function(resp) {

                        if (resp && resp.data) {
                            $log.error(resp.data);
                            failed(resp.data.error);
                        }
                    });
            };

            $scope.urlSeoEsc = utils.urlSeoEsc;
        })
    .controller(
        'PostNewCtrl',
        function($scope, $log, $state, $location, utils, post) {

            var failed = function(msg) {
                $scope.$emit('notify', {
                    type: 'alert',
                    msg: msg
                });
            };

            $scope.posts = [{
                created: (new Date()).toISOString()
            }];

            $scope.create = function() {

                // trigger input expicitly to bind updates to model
                angular.element('#post-preface').trigger('input');
                angular.element('#post-body').trigger('input');

                post.save($scope.posts[0])
                    .$promise.then(function(post) {

                        $location.path('/posts/' + post._id);
                    }, function(resp) {

                        if (resp && resp.data) {
                            $log.error(resp.data);
                            failed(resp.data.error);
                        }
                    });
            };

            $scope.urlSeoEsc = utils.urlSeoEsc;
        })
    .controller(
        'PostShare',
        function($scope, $log, $twt, $fb) {

            $scope.share = {
                twt: function(title, text, url, hashtags) {

                    text = text || '';
                    hashtags = hashtags || '';
                    hashtags = hashtags === '' ? hashtags.concat('phaninderdotcom') : hashtags.concat(',phaninderdotcom');

                    $twt.intent('tweet', {
                        text: title.concat(text),
                        url: url,
                        hashtags: hashtags
                    });
                },
                fb: function(post) {
                    $fb.feed({
                        name: post.title,
                        description: post.short_desc,
                        caption: 'phaninder blog',
                        link: post.fq_url,
                        picture: post.banner
                    });
                }
            };
        });
