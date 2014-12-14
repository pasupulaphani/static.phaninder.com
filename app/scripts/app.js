'use strict';

/**
 * @ngdoc overview
 * @name angappApp
 * @description
 * # angappApp
 *
 * Main module of the application.
 */
angular
    .module('angappApp', [
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'socialsharing'
    ])

.constant('restEndPoint', 'http://localhost:3000')

.run(function($rootScope, $window) {

    // initialize foundation
    $window.Foundation.global.namespace = '';
    $window.$(document).foundation();

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
})

.config(function($routeProvider, $fbProvider, $twtProvider) {
    $routeProvider
        .when('/posts', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
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
