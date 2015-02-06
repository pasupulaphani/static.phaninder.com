'use strict';

/**
 * @ngdoc overview
 * @name myWebApp
 * @description
 * # myWebApp
 *
 * Main module of the application.
 */
angular
    .module('myWebApp', [
        'ngResource',
        'ngCookies',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.date',
        'socialsharing',
        'csrf-cross-domain',
        'config',
        'gist-embed'
    ])

.constant('postTypes', {
    'U': 'Under construction',
    'P': 'Published',
    'T': 'Trashed',
    'M': 'MiscPublished'
})

.constant('FBAppId', 515239655250335)

.value('pageInfo', {
    title: 'phaninder.com',
    image: 'http://www.gravatar.com/avatar/da8ad3d7a783fda9082894427e6be2a9.png',
    desc: 'My findings and ramblings about tech',
    short_desc: 'My findings and ramblings about tech',
    canonical_url: 'http://phaninder.com/posts',
    short_url: 'http://phaninder.com/posts',
    twt_handler: 'PhaniPasupula'
})

.run(function($log, $window, $rootScope, $location, $state, auth, RESTapi, FBAppId, pageInfo) {

    RESTapi.url = $location.protocol() + '://' + RESTapi.host;

    $rootScope.$on('$viewContentLoaded', function() {

        // initialize foundation
        angular.element(document).ready(function() {
            angular.element(document).foundation();
        });
    });

    $rootScope.$on('$stateChangeStart', function(event, toState) {

        if (typeof toState.publicAccess !== 'undefined' && toState.publicAccess === false) {

            auth.getLoginStatus()
                .then(function(loggedIn) {

                    if (!loggedIn) {
                        $log.info('guest not allowed');
                        $state.go('404');
                        return $location.path();
                    }
                });
        }
    });

    $rootScope.location = $location;
    $rootScope.FBAppId = FBAppId;
    $rootScope.pageInfo = pageInfo;

    auth.getLoginStatus();
})

.config(function($provide, $httpProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $stateProvider, $fbProvider, $twtProvider, FBAppId) {

    $locationProvider.html5Mode(true)
        .hashPrefix('!');

    // go to the notFound route on 404 API error:
    $httpProvider.interceptors.push(function($q, $injector) {
        return {
            responseError: function(rejection) {
                if (rejection.status === 404) {
                    $injector.get('$state').go('404');
                }
                return $q.reject(rejection);
            }
        };
    });

    // default to posts
    $urlRouterProvider.when('/', '/posts');

    // go easy on trailing slash
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('posts', {
            url: '/posts',
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl'
        })
        .state('posts_status_filter', {
            url: '/posts/status/:status',
            templateUrl: 'views/posts.html',
            controller: 'PostsSearchCtrl',
            publicAccess: false
        })
        .state('post_new', {
            url: '/posts/new',
            templateUrl: 'views/post_edit.html',
            controller: 'PostNewCtrl',
            publicAccess: false
        })
        .state('post_edit', {
            url: '/posts/{id}{seo_title:(?:/[^/]+)?}/edit',
            templateUrl: 'views/post_edit.html',
            controller: 'PostEditCtrl',
            publicAccess: false
        })
        .state('post', {
            url: '/posts/{id}{seo_title:(?:/[^/]+)?}',
            templateUrl: 'views/post.html',
            controller: 'PostCtrl',
            resolve: {
                id: function($stateParams) {
                    return $stateParams.id;
                }
            }
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/post.html',
            controller: 'PostCtrl',
            resolve: {
                id: function() {
                    return 'about';
                }
            }
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'views/post.html',
            controller: 'PostCtrl',
            resolve: {
                id: function() {
                    return 'contact';
                }
            }
        })
        .state('404', {
            templateUrl: 'views/404.html'
        })
        .state('500', {
            templateUrl: 'views/500.html'
        });

    // show 404 without changing url
    $urlRouterProvider.otherwise(function($injector, $location) {

        var state = $injector.get('$state');
        state.go('404');

        return $location.path();
    });

    // socialsharing
    $fbProvider.init(FBAppId);

    $twtProvider.init()
        .trimText(true);
});
