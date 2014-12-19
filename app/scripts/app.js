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
        'socialsharing'
    ])

.constant('restEndPoint', 'http://api.local-phaninder.com')

.run(function($rootScope, $window, auth) {

    // initialize foundation
    $rootScope.$on('$viewContentLoaded', function() {
        $window.$(document).foundation();
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

.config(function($httpProvider, $routeProvider, $fbProvider, $twtProvider) {

    // for sharing cookies, ... with cross origin requests
    $httpProvider.defaults.withCredentials = true;

    // set csrf for cross origin requests
    $httpProvider.interceptors.push('myCSRF');

    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/posts', {
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl'
        })
        .when('/posts/status/:status', {
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl'
        })
        .when('/posts/:id/:seo_title?', {
            templateUrl: 'views/post.html',
            controller: 'PostCtrl'
        })
        .when('/about', {
            templateUrl: 'views/post.html',
            controller: 'AboutCtrl'
        })
        .when('/contact', {
            templateUrl: 'views/post.html',
            controller: 'ContactCtrl'
        })
        .otherwise({
            redirectTo: '/posts'
        });

    $fbProvider.init(515239655250335);

    $twtProvider.setConfig({
        trim_text: true
    });
});
