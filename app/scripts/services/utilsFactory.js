'use strict';

/**
 * @ngdoc service
 * @name myWebApp.utilsFactory
 * @description
 * # utilsFactory
 * Factory in the myWebApp.
 */
angular.module('myWebApp')
    .factory(
        'utils',
        function($window) {

            var utils = function() {};

            utils.markUp = function(posts) {
                angular.forEach(posts, function(post) {
                    post.preface = $window.marked(post.preface || '');
                    post.body = $window.marked(post.body || '');
                });
            };

            // Public API here
            return utils;
        });
