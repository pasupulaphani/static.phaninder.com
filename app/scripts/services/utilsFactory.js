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

            // Private methods
            function utils() {}

            utils.markUp = function(posts) {
                angular.forEach(posts, function(post) {
                    post.preface = $window.marked(post.preface || '');
                    post.body = $window.marked(post.body || '');
                });
            };

            utils.urlSeoEsc = function(str) {

                if (!str) {
                    return '';
                }

                str = str
                    .replace(/[^a-zA-Z0-9-_\s]/g, '') //replace except alphabits, numbers, spaces, _, -
                    .trim()
                    .replace(/[\s_-]+/g, '-'); // now replace multiple spaces, _, - with - (seo friendly)

                str = $window.escape(str); // just incase

                return angular.lowercase(str);
            };

            // Public API
            return utils;
        });
