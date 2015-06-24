'use strict';

/**
 * @ngdoc function
 * @name fdagoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fdagoApp
 */
angular.module('fdagoApp').controller('ResultsCtrl', function() {
    console.log('results controller init');
    this.results = [];
    this.search = null;
});
