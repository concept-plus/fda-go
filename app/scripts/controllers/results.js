'use strict';

/**
 * @ngdoc function
 * @name fdagoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the fdagoApp
 */
angular.module('fdagoApp').controller('ResultsCtrl', ['$scope', '$location', 'fdaGoQueryService', '$timeout', function($scope, $location, fdaGoQueryService, $timeout) {
    // set canvas id
    angular.element('.canvas').attr('id', 'results-page');

    this.results = [];

    $location.url();
    var path = $location.path();
    var pathItems = path.split('/');
    var mobileView = function() {
        angular.element('#sidebar').html('');
        angular.element('#sidemenu .sidemenu-content').attr('aria-hidden', 'false');
        if(angular.element('#sidemenu').children().length === 0){
          angular.element('.sidemenu-content').clone().appendTo('#sidemenu');
        }
        angular.element('#navigation').show();
      },
      desktopView = function() {
        angular.element('#navigation').hide();
        angular.element('#sidemenu .sidemenu-content').attr('aria-hidden', 'true');
        if(angular.element('#sidebar').children().length === 0){
          $timeout(function (){
            angular.element('.sidemenu-content').clone().appendTo('#sidebar');
          },1);
        }
      };

    this.category = decodeURIComponent(pathItems[pathItems.length - 2]);
    this.search = decodeURIComponent(pathItems[pathItems.length - 1]);

    var self = this;

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

        // Make sure the left nav menus are closed.
        if (angular.element('.canvas-slid').length > 0) {
          angular.element('.navmenu').offcanvas('hide');
        }
      });
    });

    $scope.$on('$destroy',function (){
         angular.element(window).off('resize.doResize'); //remove the handler added earlier
    });



    this.submitQuery = function() {
        var promise = null;
        switch(this.category) {
            case 'drug':
                promise = fdaGoQueryService.findDrugs(this.search);
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
                    self.results = results.results;
                },
                function(error) {
                    console.log('ERROR: ' + JSON.stringify(error));
                }
            );
        }
    };

    this.formatArray = function(array) {
        if (angular.isArray(array)) {
            return array.join(', ');
        }
        return array;
    };

    this.submitQuery();
}]);

