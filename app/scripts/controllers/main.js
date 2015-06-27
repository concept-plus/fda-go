'use strict';

/**
 * @ngdoc function
 * @name fdagoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fdagoApp
 */
angular.module('fdagoApp').controller('MainCtrl', function($rootScope, $scope) {
    // reset sidemenu
    angular.element('.canvas').attr('id', 'main-page');
    angular.element('#sidemenu-content').appendTo('#sidemenu');

    $scope.submitSearch = function (q) {
      $rootScope.submitSearchSidebar(q);
    };

    /*
    $scope.submitDrugRecallQuery = angular.bind(null, navigateToResults, 'drug');

    $scope.submitDeviceRecallQuery = angular.bind(null, navigateToResults, 'device');

    $scope.submitFoodRecallQuery = angular.bind(null, navigateToResults, 'food');

    */


});
