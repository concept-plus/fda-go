'use strict';

/**
 * @ngdoc function
 * @name fdagoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the fdagoApp
 */
angular.module('fdagoApp').controller('ResultsCtrl', function($scope, $location, fdaGoQueryService) {
    // set canvas id
    angular.element('.canvas').attr('id', 'results-page');

    $scope.results = [];
    $scope.resultsMessage = '';

    $location.url();
    var path = $location.path();
    var pathItems = path.split('/');
    var mobileView = function() {
        angular.element('#sidemenu .sidemenu-content').attr('aria-hidden', 'false');
        angular.element('#sidebar').hide();
        angular.element('#navigation').show();
      },
      desktopView = function() {
        angular.element('#navigation').hide();
        angular.element('#sidemenu .sidemenu-content').attr('aria-hidden', 'true');
        angular.element('#sidebar').show();
      };

    $scope.category = decodeURIComponent(pathItems[pathItems.length - 2]);
    $scope.search = decodeURIComponent(pathItems[pathItems.length - 1]);

    mobileView(); //reset.
    if (angular.element(window).innerWidth() > 766) {
      desktopView();
    }
    angular.element(window).on('resize.doResize', function (){
      $scope.$apply(function(){
        if (angular.element(window).innerWidth() < 767) {
          // Handle mobile view
          mobileView();
        } else {
          // Handle desktop view
          desktopView();
        }
        $scope.resetSidemenu();
      });
    });

    $scope.$on('$destroy',function (){
         angular.element(window).off('resize.doResize'); //remove the handler added earlier
    });

    $scope.resetSidemenu = function(){
      // Make sure the left nav menus are closed.
      if (angular.element('.canvas-slid').length > 0) {
        angular.element('.navmenu').offcanvas('hide');
      }
    };

    $scope.submitQuery = function() {
        var promise = null;
        switch($scope.category) {
            case 'drug':
                promise = fdaGoQueryService.findDrugs($scope.search);
                break;
            case 'drugRecall':
                promise = fdaGoQueryService.getRecentDrugRecalls();
                break;
            case 'deviceRecall':
                promise = fdaGoQueryService.getRecentDeviceRecalls();
                break;
            case 'foodRecall':
                promise = fdaGoQueryService.getRecentFoodRecalls();
                break;
        }
        if (angular.isDefined(promise)) {
            promise.then(
                function(results) {
                    $scope.results = results.results;
                    if ($scope.results.length === 0){
                      $scope.resultsMessage = 'No results found for ' + $scope.search + '.';
                    }
                },
                function(error) {
                    console.log('ERROR: ' + JSON.stringify(error));
                }
            );
        }
    };

    $scope.formatArray = function(array) {
        if (angular.isArray(array)) {
            return array.join(', ');
        }
        return array;
    };

    $scope.submitQuery();
});

