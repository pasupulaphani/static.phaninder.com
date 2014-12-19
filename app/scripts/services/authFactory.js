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
        function($log, $http, $q, restEndPoint) {

            var user = {
                loggedIn: false,
                name: ''
            };

            var login = function(email, password) {
                return $http.post(restEndPoint + '/login', {
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
                    });
            };

            var getLoginStatus = function() {
                return $q.when($http.get(restEndPoint + '/login')
                    .then(function() {
                        user.loggedIn = true;
                        return true;
                    })
                    .catch(function() {
                        user.loggedIn = false;
                    }));
            };

            var logout = function() {
                return $http.get(restEndPoint + '/logout')
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
