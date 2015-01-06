'use strict';

/**
 * @ngdoc service
 * @name myWebApp.auth
 * @description
 * # auth
 * Factory in the myWebApp.
 */
angular.module('myWebApp')
    .factory(
        'auth',
        function($log, $http, $q, RESTapi) {

            var user = {
                loggedIn: false,
                name: ''
            };

            var login = function(email, password) {
                return $http.post(RESTapi.url + '/login', {
                        email: email,
                        password: password
                    })
                    .then(function() {
                        $log.info('logged in successfully');
                        user.loggedIn = true;
                        return true;
                    })
                    .catch(function(response) {
                        $log.warn('log in failed');
                        $log.warn(response);
                        user.loggedIn = false;
                        return false;
                    });
            };

            var getLoginStatus = function() {
                return $http.get(RESTapi.url + '/login')
                    .then(function() {
                        user.loggedIn = true;
                        return true;
                    })
                    .catch(function() {
                        user.loggedIn = false;
                        return false;
                    });
            };

            var logout = function() {
                return $http.get(RESTapi.url + '/logout')
                    .then(function() {
                        user.loggedIn = false;
                        return true;
                    });
            };

            // Public API here
            return {
              user: user,
              login: login,
              getLoginStatus: getLoginStatus,
              logout: logout
            };
        });
