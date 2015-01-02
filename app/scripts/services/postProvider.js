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

      this.$get = ['$resource', 'RESTapi', function($resource, RESTapi) {
        var Post = $resource(RESTapi.url + '/posts/:id/:seo_title', {id: '@id'}, {
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
