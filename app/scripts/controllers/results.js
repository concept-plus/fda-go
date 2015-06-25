'use strict';

/**
 * @ngdoc function
 * @name fdagoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the fdagoApp
 */
angular.module('fdagoApp').controller('ResultsCtrl', ['$location', 'fdaGoQueryService', function($location, fdaGoQueryService) {
    console.log('results controller init');
    this.results = [];

    $location.url();
    var path = $location.path();
    var pathItems = path.split('/');

    this.category = decodeURIComponent(pathItems[pathItems.length - 2]);
    this.search = decodeURIComponent(pathItems[pathItems.length - 1]);

    console.log('results controller: category=' + this.category + ', search=' + this.search);

    var self = this;

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
