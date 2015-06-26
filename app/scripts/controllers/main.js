'use strict';

/**
 * @ngdoc function
 * @name fdagoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fdagoApp
 */
angular.module('fdagoApp').controller('MainCtrl', function($scope, $location) {
    // reset sidemenu
    angular.element('.canvas').attr('id', 'main-page');
    angular.element('#sidemenu-content').appendTo('#sidemenu');

    this.queryCategory = 'drug';
    this.searchString = null;

    var navigateToResults = function(category, search) {
        category = encodeURIComponent(category);
        search = encodeURIComponent(search);
        var path = '/results/' + category;
        if (('' + search).length > 0) {
            path = path + '/' + search;
        }
        console.log('navigating to ' + path);
        $location.path(path);
    };

    this.submitSearch = function() {
        navigateToResults(this.queryCategory, this.searchString);
    };

    this.submitDrugRecallQuery = angular.bind(null, navigateToResults, 'drug');

    this.submitDeviceRecallQuery = angular.bind(null, navigateToResults, 'device');

    this.submitFoodRecallQuery = angular.bind(null, navigateToResults, 'food');
});
