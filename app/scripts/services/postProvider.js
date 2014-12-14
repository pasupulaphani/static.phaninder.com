'use strict';

/**
 * @ngdoc service
 * @name angappApp.postProvider
 * @description
 * # postProvider
 * Provider in the angappApp.
 */
angular.module('angappApp')
  .provider(
    'post',
    function () {

      this.$get = ['$resource', 'restEndPoint', function($resource, restEndPoint) {
        var Post = $resource(restEndPoint + '/posts/:id/:seo_title', {}, {
          update: {
            method: 'PUT'
          }
        });

        return Post;
      }];
  })
  .provider(
    'about',
    function () {

      this.$get = ['$resource', 'restEndPoint', function($resource, restEndPoint) {
        var About = $resource(restEndPoint + '/about', {}, {});

        return About;
      }];
  })
  .provider(
    'contact',
    function () {

      this.$get = ['$resource', 'restEndPoint', function($resource, restEndPoint) {
        var Contact = $resource(restEndPoint + '/contact', {}, {});

        return Contact;
      }];
  });