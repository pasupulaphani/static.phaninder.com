'use strict';

/**
 * @ngdoc service
 * @name myWebApp.postProvider
 * @description
 * # postProvider
 * Provider in the myWebApp.
 */
angular.module('myWebApp')
  .provider(
    'post',
    function () {

      this.$get = ['$resource', 'restEndPoint', function($resource, restEndPoint) {
        var Post = $resource(restEndPoint + '/posts/:id/:seo_title', {id: '@id'}, {
          update: {
            method: 'PUT'
          },
          setStatus: {
            method: 'PATCH',
            params: {
              status: '@status'
            }
          }
        });

        return Post;
      }];
  });
