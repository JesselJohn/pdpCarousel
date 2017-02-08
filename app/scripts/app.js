'use strict';

/**
 * @ngdoc overview
 * @name pdpSliderApp
 * @description
 * # pdpSliderApp
 *
 * Main module of the application.
 */
angular
    .module('pdpSliderApp', [
        'ngCookies',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
        $httpProvider.defaults.useXDomain = true;
        $locationProvider.html5Mode(true);
    });
