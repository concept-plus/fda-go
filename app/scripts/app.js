'use strict';

/**
 * @ngdoc overview
 * @name fdagoApp
 * @description
 * # fdagoApp
 *
 * Main module of the application.
 */
angular
  .module('fdagoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'services',
    'utilities'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/results/:category/', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/results/:category/:search', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('RootCtrl', function($rootScope, $location){
    $rootScope.submitSearchSidebar = function(q){
      angular.element('.navmenu').offcanvas('hide');
      $rootScope.category = 'drug';
      $location.path('/results/' + $rootScope.category + '/' + encodeURIComponent(q));
    };
    $rootScope.showLoading = function(bool){
      if (bool) {
        angular.element('#loading').show();
      } else {
        angular.element('#loading').hide();
      }
    };

    $rootScope.getRecall = function(type){
      console.log(type);
    };
  });
