'use strict';

/**
 * @ngdoc function
 * @name myWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myWebApp
 */
angular.module('myWebApp')
    .controller('MainCtrl', function($rootScope, $scope, $location, pageInfo, postTypes, auth) {

        // bind data
        $scope.user = auth.user;
        $scope.postTypes = postTypes;

        // public api
        $scope.logout = function() {
            auth.logout()
                .then(function(success) {
                    if (success) {
                        $location.path('/');
                    }
                });
        };

        // notification stuff
        $scope.notify = {
            show: false
        };

        $scope.$on('notify', function(event, data) {
            angular.extend($scope.notify, data);
            $scope.notify.show = true;
        });

        $rootScope.$on('$stateChangeStart', function() {
            // clear notification
            $scope.notify.show = false;
        });

        // set pageInfo
        $scope.$on('setPageInfo', function(event, post) {
            $rootScope.pageInfo.title = post.title;
            $rootScope.pageInfo.image = post.banner || $rootScope.pageInfo.image;
            $rootScope.pageInfo.desc = post.preface || $rootScope.pageInfo.desc;
            $rootScope.pageInfo.short_desc = post.short_desc || $rootScope.pageInfo.short_desc;

            var url = $location.protocol() + '://' + $location.host() + '/posts/' + post._id;
            $rootScope.pageInfo.short_url = url;

            if (post.seo_url && post.seo_url !== '') {
                url = url + '/' + post.seo_url;
            }
            $rootScope.pageInfo.canonical_url = url;
        });
    });
