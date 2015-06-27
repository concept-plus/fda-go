'use strict';

/**
 * @ngdoc function
 * @name fdagoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the fdagoApp
 */
angular.module('fdagoApp').controller('ResultsCtrl', ['$q', '$rootScope', '$scope', '$location', 'fdaGoQueryService', 'queryUtil', function($q, $rootScope, $scope, $location, fdaGoQueryService, util) {
    // set canvas id
    angular.element('.canvas').attr('id', 'results-page');

    $scope.results = {
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
    $scope.resultsMessage = '';
    $scope.selectedItem = null;
    $scope.selectedSubcategory = 'event';

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

    $scope.onClickTab = function() {
        var event = window.event;
        event.preventDefault();
        angular.element(event.currentTarget).show();
    };

    $scope.setResults = function(subcategory, promise) {
        promise.then(
            function(results) {
                console.log('setting results for ' + subcategory);
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
                $scope.setResults('recallResults', promise);
                promises.push(promise);
            }
        }
        $q.all(promises).finally(function() {
          $rootScope.showLoading(false);
          angular.element('#results-container').addClass('in');
          try {
            if ($scope.results.event.total + $scope.results.label.total + $scope.results.recall.total === 0){
              $scope.resultsMessage = 'No results found for ' + $scope.search + '.';
            }
          }catch(e){
            $scope.resultsMessage = 'No results found for ' + $scope.search + '.';
          }
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
                        if (angular.uppercase(brandName).includes(ucSearch)) {
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
                        reactionStr += ': Not recovered';
                        break;
                    case '4': // recovered with sequelae
                        reactionStr += ': Recovered with sequelae';
                        break;
                    case '5': // fatal
                        reactionStr += ': Fatal';
                        break;
                    case '6': // unknown
                        break;
                }
                reactions.push(reactionStr);
            });
        }
        return reactions.join(', ');
    };

    $scope.submitQuery();
}]);

