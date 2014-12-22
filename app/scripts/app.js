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
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'socialsharing'
    ])

.constant('restEndPoint', 'http://localhost:3000')

.run(function($rootScope, $window, $location, $state, auth) {

    // initialize foundation
    $rootScope.$on('$viewContentLoaded', function() {
        $window.$(document).foundation();
    });

    $rootScope.$on('$stateChangeStart', function(event, toState) {

        if (typeof toState.publicAccess !== 'undefined' && toState.publicAccess === false) {

            auth.getLoginStatus()
                .then(function(loggedIn) {

                    if (!loggedIn) {
                        console.info('guest not allowed');
                        $state.go('404');
                        return $location.path();
                    }
                });
        }
    });

    $rootScope.site = {
        name: 'phaninder.com',
        url: encodeURIComponent(document.URL),
        short_url: document.URL
    };

    // set some common content
    $rootScope.me = {
        image: 'http://www.gravatar.com/avatar/da8ad3d7a783fda9082894427e6be2a9.png',
        description: 'Hi there! I\'m Phani. I live in London. I am a full stack developer who specializes in creating dynamic and beautiful web apps. I currently spend more time in developing new automation techniques for automating project life cycles of my mobile apps.',
        twt_handler: 'PhaniPasupula'
    };

    auth.getLoginStatus();

})

.config(function($httpProvider, $urlRouterProvider, $stateProvider, $fbProvider, $twtProvider) {

    // for sharing cookies, ... with cross origin requests
    $httpProvider.defaults.withCredentials = true;

    // set csrf for cross origin requests
    $httpProvider.interceptors.push('myCSRF');

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

    // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions\
    //#how-to-make-a-trailing-slash-optional-for-all-routes
    $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.url();

        // check to see if the path already has a slash where it should be
        if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
            return;
        }

        if (path.indexOf('?') > -1) {
            return path.replace('?', '/?');
        }

        return path + '/';
    });

    // default to posts
    $urlRouterProvider.when('/', '/posts');

    // make sure that all paths end with trailing spaces
    $stateProvider
        .state('login', {
            url: '/login/',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('posts', {
            url: '/posts/',
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl'
        })
        .state('posts.status', {
            url: '/status/:status?/',
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl',
            publicAccess: false
        })
        .state('post', {
            url: '/posts/:id/',
            templateUrl: 'views/post.html',
            controller: 'PostCtrl'
        })
        .state('post_seo_title', {
            url: '/posts/:id/:seo_title/',
            templateUrl: 'views/post.html',
            controller: 'PostCtrl'
        })
        .state('about', {
            url: '/about/',
            templateUrl: 'views/post.html',
            controller: 'AboutCtrl'
        })
        .state('contact', {
            url: '/contact/',
            templateUrl: 'views/post.html',
            controller: 'ContactCtrl'
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
    $fbProvider.init(515239655250335);

    $twtProvider.setConfig({
        trim_text: true
    });
});
