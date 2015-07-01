'use strict';

/**
 * @ngdoc function
 * @name fdagoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the fdagoApp
 */
angular.module('fdagoApp').controller('ResultsCtrl', [
    '$q',
    '$rootScope',
    '$scope',
    '$location',
    'fdaGoQueryService',
    'queryUtil',
    '$timeout',
    function($q, $rootScope, $scope, $location, fdaGoQueryService, util, $timeout) {
    // set canvas id
    angular.element('body').attr('id', 'results-page');

    $scope.EMPTY_RESULTS = {
        'event': {
            total: 0,
            items: []
        },
        'label': {
            total: 0,
            items: []
        },
        'recall': {
            total: 0,
            items: []
        }
    };
    $scope.results = $scope.EMPTY_RESULTS;
    $scope.resultsMessage = '';
    $scope.selectedItem = null;
    $scope.selectedSubcategory = 'event';

    $location.url();
    var path = $location.path();
    var pathItems = path.split('/');
    var mobileView = function() {
        angular.element('#sidemenu .sidemenu-content').attr('aria-hidden', 'false');
        angular.element('#sidebar').hide();
        //angular.element('#sidemenu').removeClass('hidden');
        angular.element('#navigation').show();
      },
      desktopView = function() {
        angular.element('#navigation').hide();
        //angular.element('#sidemenu').addClass('hidden');
        angular.element('#sidemenu .sidemenu-content').attr('aria-hidden', 'true');
        angular.element('#sidebar').show();
      };

    $scope.category = decodeURIComponent(pathItems[pathItems.length - 2]);
    $scope.search = decodeURIComponent(pathItems[pathItems.length - 1]);

    mobileView(); //reset.
    if (angular.element(window).innerWidth() > 991) {
      desktopView();
    }
    angular.element(window).on('resize.doResize', function (){
      $scope.$apply(function(){
        if (angular.element(window).innerWidth() < 992) {
          // Handle mobile view
          mobileView();
        } else {
          // Handle desktop view
          desktopView();
        }
        $rootScope.resetSidemenu();
      });
    });

    $scope.$on('$destroy',function (){
         angular.element(window).off('resize.doResize'); //remove the handler added earlier
    });

    $scope.collapse = function(index){
      angular.element('#result-' + index).collapse('toggle');
    };

    $scope.drawDataTable = function(){
      if(angular.element('#event-results-table_wrapper').length === 0){
        angular.element('#event-results-table').DataTable({
          'ordering': false,
          'oLanguage': {
            'sSearch': 'Filter:'
          },
          'responsive': true
        });
      }
      if(angular.element('#label-results-table_wrapper').length === 0){
          angular.element('#label-results-table').DataTable({
          'ordering': false,
          'oLanguage': {
            'sSearch': 'Filter:'
          },
          'responsive': true
        });
      }
      if(angular.element('#recall-results-table_wrapper').length === 0){
          angular.element('#recall-results-table').DataTable({
          'ordering': false,
          'oLanguage': {
            'sSearch': 'Filter:'
          },
          'responsive': true
        });
      }
    };

    $scope.onClickTab = function(id) {
        $timeout(function() {
            angular.element('#'+id).tab('show');
        },100);
    };

    $scope.setResults = function(subcategory, promise) {
        promise.then(
            function(results) {
                //console.log('setting results for ' + subcategory);
                $scope.results[subcategory].total = results.meta.results.total;
                $scope.results[subcategory].items = results.results;
            },
            function(/*error*/) {
                $scope.results[subcategory].total = 0;
                $scope.results[subcategory].items = [];
            }
        );
    };

    $scope.submitQuery = function() {
        $scope.results = $scope.EMPTY_RESULTS;
        angular.element('#results-container').removeClass('in');
        angular.element('#api-called').empty();
        var promises = [];
        if ($scope.category === 'drug') {
            var eventPromise = fdaGoQueryService.findDrugEvents($scope.search);
            var labelingPromise = fdaGoQueryService.findDrugLabeling($scope.search);
            var recallPromise = fdaGoQueryService.findDrugRecalls($scope.search);
            $scope.setResults('event', eventPromise);
            $scope.setResults('label', labelingPromise);
            $scope.setResults('recall', recallPromise);
            promises.push(eventPromise, labelingPromise, recallPromise);

            eventPromise.then($scope.massageEventData);
        } else {
            var promise = null;
            switch($scope.category) {
                case 'drug-recall':
                    promise = fdaGoQueryService.getRecentDrugRecalls();
                    break;
                case 'device-recall':
                    promise = fdaGoQueryService.getRecentDeviceRecalls();
                    break;
                case 'food-recall':
                    promise = fdaGoQueryService.getRecentFoodRecalls();
                    break;
            }
            if (angular.isDefined(promise)) {
                $scope.setResults('recall', promise);
                promises.push(promise);
            }
        }
        $q.all(promises).finally(function() {
          $rootScope.showLoading(false);
          $timeout(function(){
            if ($scope.category.indexOf('-recall') > -1){
              angular.element('#detail-tabs a:last').tab('show');
            } else {
              angular.element('#detail-tabs a:first').tab('show');
            }
            $scope.drawDataTable();
          },300);
          try {
            if ($scope.results.event.total + $scope.results.label.total + $scope.results.recall.total === 0){
              $scope.resultsMessage = 'No results found for ' + $scope.search + '.';
            }
          }catch(e){
            $scope.resultsMessage = 'No results found for ' + $scope.search + '.';
          }
          setTimeout(function() {
            $rootScope.showLoading(false);
            angular.element('#results-container').addClass('in');
          }, 0);
        });
    };

    $scope.massageEventData = function(results) {
        //console.log('processing event results');
        var ucSearch = angular.uppercase($scope.search);
        angular.forEach(results.results, function(result) {
            var matchingDrugs = [];
            angular.forEach(result.patient.drug, function(drug) {
                if (drug.openfda && drug.openfda.brand_name) {
                    angular.forEach(drug.openfda.brand_name, function(brandName) {
                        if (angular.uppercase(brandName).indexOf(ucSearch) > -1) {
                            matchingDrugs.push(drug);
                        }
                    });
                }
            });
            matchingDrugs = util.removeDuplicateDrugs(matchingDrugs);
            var brandNames = [];
            angular.forEach(matchingDrugs, function(drug) {
                brandNames = brandNames.concat(drug.openfda.brand_name);
            });
            result.fdago = {
                matchingBrandNames: brandNames
            };
        });
    };

    $scope.formatArray = function(array) {
        if (angular.isArray(array)) {
            return array.join(', ');
        }
        return array;
    };

    $scope.listDrugs = function(drugEvent, field) {
        var items = [];
        angular.forEach(drugEvent.patient.drug, function(drug) {
            if (angular.isDefined(drug[field])) {
                items.push(drug[field]);
            }
        });
        return items.join(', ');
    };

    $scope.toDate = function(dateString) { //takes date string in yyyymmdd format
        if (dateString.length === 8) {
            dateString = dateString.substring(0, 4) + '-' + dateString.substring(4, 6) + '-' + dateString.substring(6);
            return new Date(dateString);
        }
        return null;
    };

    $scope.getPatientReaction = function(drugEvent) {
        var reactions = [];
        if (drugEvent.patient && drugEvent.patient.reaction) {
            angular.forEach(drugEvent.patient.reaction, function(reaction) {
                var reactionStr = reaction.reactionmeddrapt;
                var outcome = reaction.reactionoutcome;
                switch(outcome) {
                    case '1': // recovered
                        break;
                    case '2': // recovering
                        break;
                    case '3': // not recovered
                        reactionStr += ' (Did not recover)';
                        break;
                    case '4': // recovered with sequelae
                        reactionStr += ' (Recovered with sequelae)';
                        break;
                    case '5': // fatal
                        reactionStr += ' (Fatal)';
                        break;
                    case '6': // unknown
                        break;
                }
                reactions.push(reactionStr);
            });
        }
        return reactions.join(', ');
    };

    $scope.getPatientDemographics = function(drugEvent) {
        // male, 47-years-old, 168lbs
        var demoStr = '';
        var patient = drugEvent.patient;
        if (patient.patientsex) {
            demoStr += patient.patientsex === '1' ? 'Male' : patient.patientsex === '2' ? 'Female' : '';
        }
        if (patient.patientonsetage && patient.patientonsetageunit) {
            if (demoStr.length > 0) {
                demoStr += ', ';
            }
            demoStr += Math.round(patient.patientonsetage);
            switch (patient.patientonsetageunit) {
                case '800': // age measured in decades
                    demoStr += 's';
                    break;
                case '801': // age measured in years
                    demoStr += ' years old';
                    break;
                case '802': // age measured in months
                    demoStr += ' months old';
                    break;
                case '803': // age measured in weeks
                    demoStr += ' weeks old';
                    break;
                case '804': // age measured in days
                    demoStr += ' days old';
                    break;
                case '805': // age measured in hours
                    demoStr += ' hours old';
                    break;
                default:
                    break;
            }
        }
        if (patient.patientweight) {
            if (demoStr.length > 0) {
                demoStr += ', ';
            }
            demoStr += Math.round(patient.patientweight * 2.2046) + 'lbs'; // convert kg to lbs and remove decimal
        }
        return demoStr;
    };

    $scope.submitQuery();
}]);

