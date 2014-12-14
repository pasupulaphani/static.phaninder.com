'use strict';

/**
 * @ngdoc service
 * @name angappApp.utilsFactory
 * @description
 * # utilsFactory
 * Factory in the angappApp.
 */
angular.module('angappApp')
    .factory(
        'utils',
        function($window) {

            var markUp = function(posts) {
                angular.forEach(posts, function(post) {
                    post.preface = $window.marked(post.preface || '');
                    post.body = $window.marked(post.body || '');
                });
            };

            // Public API here
            return {
                markUp: markUp
            };
        });
