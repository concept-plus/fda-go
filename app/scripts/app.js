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
    'utilities',
    'datatables'
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
      if (q === undefined || q === '') {
        $rootScope.invalid = true;
      } else {
        angular.element('.navmenu').offcanvas('hide');
        $rootScope.invalid = false;
        $rootScope.category = 'drug';
        $location.path('/results/' + $rootScope.category + '/' + encodeURIComponent(q));
      }
    };
    $rootScope.showLoading = function(bool){
      if (bool) {
        angular.element('#loading').show();
      } else {
        angular.element('#loading').hide();
      }
    };

    $rootScope.resetSidemenu = function(){
      // Make sure the left nav menus are closed.
      if (angular.element('.canvas-slid').length > 0) {
        angular.element('.navmenu').offcanvas('hide');
      }
    };

    $rootScope.getRecall = function(type){
      angular.element('api-called').empty();
      $rootScope.category = type;
      $location.path('/results/' + type);
      $rootScope.resetSidemenu();
    };

    $rootScope.toggleAPI = function(){
      angular.element('#api-well').collapse('toggle');
    };

    $rootScope.toggleHelp = function(){
      angular.element('#myModal').modal('show');
    };
  });
