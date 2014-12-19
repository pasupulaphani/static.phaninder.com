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

.constant('restEndPoint', 'http://api.local-phaninder.com')

.run(function($rootScope, $window, $location, $state, auth) {

    // initialize foundation
    $rootScope.$on('$viewContentLoaded', function() {
        $window.$(document).foundation();
    });

    $rootScope.$on('$stateChangeStart', function(event, toState) {

        if (toState.publicAccess !== true) {

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
        description: 'Hi there! I\'m Phani. I live in London. I am a full stack developer who specializes in creating dynamic and beautiful web apps. I currently spend more time in developing new automation techniques for automating project life cycles of my mobile apps.'
    };

    auth.getLoginStatus();

})

.config(function($httpProvider, $urlRouterProvider, $stateProvider, $fbProvider, $twtProvider) {

    // for sharing cookies, ... with cross origin requests
    $httpProvider.defaults.withCredentials = true;

    // set csrf for cross origin requests
    $httpProvider.interceptors.push('myCSRF');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl',
            publicAccess: true
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            publicAccess: true
        })
        .state('posts', {
            url: '/posts',
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl',
            publicAccess: true
        })
        .state('posts.status', {
            url: '/status/:status?',
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl'
        })
        .state('post', {
            url: '/posts/:id/:seo_title?',
            templateUrl: 'views/post.html',
            controller: 'PostCtrl',
            publicAccess: true
        })
        .state('/about', {
            url: '/about',
            templateUrl: 'views/post.html',
            controller: 'AboutCtrl',
            publicAccess: true
        })
        .state('/contact', {
            url: '/contact',
            templateUrl: 'views/post.html',
            controller: 'ContactCtrl',
            publicAccess: true
        })
        .state('404', {
            templateUrl: 'views/404.html'
        })
        .state('500', {
            templateUrl: 'views/500.html'
        });

    $urlRouterProvider.otherwise(function($injector, $location) {
        var state = $injector.get('$state');
        state.go('404');
        return $location.path();
    });

    $fbProvider.init(515239655250335);

    $twtProvider.setConfig({
        trim_text: true
    });
});
