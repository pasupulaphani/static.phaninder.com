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
        function() {

            var markUp = function(posts) {
                angular.forEach(posts, function(post) {
                    post.preface = marked(post.preface || '');
                    post.body = marked(post.body || '');
                });
            }

            // Public API here
            return {
                markUp: markUp
            };
        });
