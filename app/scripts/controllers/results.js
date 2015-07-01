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
    'DTOptionsBuilder',
    'DTColumnBuilder',
    function($q, $rootScope, $scope, $location, fdaGoQueryService, util, $timeout) {
    // set canvas id
    angular.element('.canvas').attr('id', 'results-page');

    $scope.getEmptyResults = function() {
        return {
            'event': {
                total: 0,
                items: [],
                initialized: false
            },
            'label': {
                total: 0,
                items: [],
                initialized: false
            },
            'recall': {
                total: 0,
                items: [],
                initialized: false
            }
        };
    };
    $scope.results = $scope.getEmptyResults();
    $scope.resultsMessage = '';
    $scope.activeSubcategory = 'event';

    if (angular.isUndefined($rootScope.resultDatatables)) {
        $rootScope.resultDatatables = {};
    }
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

    $scope.drawDataTable = function($table, columns) {
      var subcategory = $table.data('subcategory');
      $rootScope.resultDatatables[subcategory] = $table.DataTable({
        'ordering': false,
        // 'oLanguage': {
        //   'sSearch': 'Filter:'
        // },
        'searching': false,
        'lengthChange': false,
        'columns': columns,
        'responsive': true,
        'serverSide': true,
        'ajax': angular.bind(this, $scope.doAjax, subcategory)
      });
    };

    $scope.doAjax = function(subcategory, data, dtCallback, settings) {
        var page = data.start / data.length;
        var promise = $scope.submitQuery(subcategory, page);
        promise.then(
            function onSuccess(results) {
                console.log('setting results for ' + subcategory);
                $scope.results[subcategory].total = results.meta.results.total;
                $scope.results[subcategory].items = results.results;
                if (subcategory === 'event' && results.results) {
                    $scope.massageEventData(results);
                }
                $scope.results[subcategory].initialized = true;
                if ($scope.category === 'drug') {
                    if ($scope.results.event.initialized && $scope.results.label.initialized && $scope.results.recall.initialized) {
                        $scope.finalizeQuery(subcategory);
                    }
                } else {
                    $scope.finalizeQuery(subcategory);
                }
                dtCallback({
                    draw: data.draw * 1,
                    recordsTotal: results.meta.results.total,
                    recordsFiltered: results.meta.results.total,
                    data: results.results
                });
            },
            function onError(error) {
                $scope.results[subcategory].total = 0;
                $scope.results[subcategory].items = [];
                var errorMsg = (error && error.error && error.error.message) || 'Error retrieving data';
                dtCallback({
                    draw: data.draw * 1,
                    data: [],
                    error: errorMsg
                });
            }
        );
    };

    $scope.onClickTab = function() {
        var event = window.event;
        event.preventDefault();
        var tab = angular.element(event.currentTarget);
        $scope.activeSubcategory = tab.data('subcategory');
        tab.show();
    };

    $scope.initiateQuery = function() {
        // clear current search
        $scope.results = $scope.getEmptyResults();
        angular.forEach(['event', 'label', 'recall'], function(subcategory) {
            if ($rootScope.resultDatatables[subcategory]) {
                $rootScope.resultDatatables[subcategory].clear();
                $rootScope.resultDatatables[subcategory].destroy();
                $rootScope.resultDatatables[subcategory] = null;
            }
        });
        // angular.element('.results-table').empty();

        // recreate tables
        setTimeout(function() {
            if ($scope.category === 'drug') {
                $scope.activeSubcategory = 'event';
                $scope.drawDataTable(angular.element('#event-results-table'), [
                    { title: 'Date', data: angular.bind(this, $scope.formatDate, 'transmissiondate'), defaultContent: '' },
                    { title: 'Patient Reaction', data: $scope.getPatientReaction, defaultContent: '' },
                    { title: 'Brand Name', data: $scope.getCollapsedBrandNames, defaultContent: '' }
                ]);
                $scope.drawDataTable(angular.element('#label-results-table'), [
                    { title: 'Brand Name', data: function(result) { return $scope.formatArray(result.openfda.brand_name); }, defaultContent: '' },
                    { title: 'Controlled Substance', data: 'controlled_substance', defaultContent: '' },
                    { title: 'Recent Major Changes', data: 'recent_major_changes', defaultContent: '' },
                    { title: 'Effective Date', data: angular.bind(this, $scope.formatDate, 'effective_time'), defaultContent: '' },
                ]);
            } else {
                $scope.activeSubcategory = 'recall';
            }
            $scope.drawDataTable(angular.element('#recall-results-table'), [
                { title: 'Date', data: angular.bind(this, $scope.formatDate, 'recall_initiation_date'), defaultContent: '' },
                { title: 'Product Description', data: 'product_description', defaultContent: '' },
                { title: 'Reason / Problem', data: 'reason_for_recall', defaultContent: '' },
                { title: 'Brand Name', data: function(result) { return $scope.formatArray(result.openfda.brand_name); }, defaultContent: '' },
                { title: 'Company', data: 'recalling_firm', defaultContent: '' }
            ]);
        }, 0);
    };

    $scope.submitQuery = function(subcategory, page) {
        // angular.element('#results-container').removeClass('in');
        var promise = null;
        if ($scope.category === 'drug') {
            switch (subcategory) {
                case 'event':
                    promise = fdaGoQueryService.findDrugEvents($scope.search, page);
                    break;
                case 'label':
                    promise = fdaGoQueryService.findDrugLabeling($scope.search, page);
                    break;
                case 'recall':
                    promise = fdaGoQueryService.findDrugRecalls($scope.search, page);
                    break;
                default:
                    break;
            }
        } else {
            switch ($scope.category) {
                case 'drug-recall':
                    promise = fdaGoQueryService.getRecentDrugRecalls(page);
                    break;
                case 'device-recall':
                    promise = fdaGoQueryService.getRecentDeviceRecalls(page);
                    break;
                case 'food-recall':
                    promise = fdaGoQueryService.getRecentFoodRecalls(page);
                    break;
            }
        }
        return promise;
    };

    $scope.finalizeQuery = function(subcategory) {
        $timeout(function() {
            angular.element('#detail-tabs a[data-subcategory="' + $scope.activeSubcategory + '"]').tab('show');
        }, 300);
        try {
            if ($scope.results.event.total + $scope.results.label.total + $scope.results.recall.total === 0){
              $scope.resultsMessage = 'No results found for ' + $scope.search + '.';
            }
        } catch(e) {
            $scope.resultsMessage = 'No results found for ' + $scope.search + '.';
        }
        $timeout(function() {
            $rootScope.showLoading(false);
            angular.element('#results-container').addClass('in');
            $scope.attachHandlers();
        }, 0);
        // $rootScope.resultDatatables[subcategory].draw();
    };

    $scope.attachHandlers = function() {
        angular.element('#event-results-table').on('click', '.brand-collapse-toggle', function(event) {
            var id = angular.element(event.currentTarget).data('target');
            angular.element('#' + id).collapse('toggle');
        });
    };

    $scope.massageEventData = function(results) {
        console.log('processing event results');
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

    $scope.formatDate = function(field, result) { //takes date string in yyyymmdd format
        var dateString = result[field];
        if (dateString && dateString.length === 8) {
            var year = dateString.substring(0, 4);
            var month = dateString.substring(4, 6);
            var day = dateString.substring(6);
            return (month * 1) + '/' + (day * 1) + '/' + year;
        }
        return dateString;
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

    $scope.getCollapsedBrandNames = function(drugEvent, mode, info, position) {
        var brandNames = drugEvent.fdago.matchingBrandNames;
        if (brandNames.length === 0) {
            return 'No brand data.';
        } else {
            var collapseId = 'result-' + position.row;
            return  '<a class="brand-collapse-toggle" aria-expanded="false" data-target="' + collapseId + '" data-toggle="collapse" aria-controls="' + collapseId + '">Click to view affected brands.</a>' +
                    '<div class="collapse" id="' + collapseId + '">' +
                        '<div class="well">' + brandNames.join(', ') + '</div>' +
                    '</div>';
        }
    };

    $scope.initiateQuery();
}]);

