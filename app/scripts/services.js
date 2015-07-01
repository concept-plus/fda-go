var queryServices = angular.module('services', ['utilities', 'openFdaServices']);

queryServices.factory('fdaGoQueryService', ['queryUtil', '$q', 'drugQueryService', 'deviceQueryService', 'foodQueryService',
    function(util, $q, drugQueryService, deviceQueryService, foodQueryService) {
        'use strict';

        return {
            // findDrugs: function(name) {
            //     var drugs = [];
            //     var deferred = $q.defer();

            //     var eventPromise = drugQueryService.findAdverseEventsByName(name);
            //     var labelPromise = drugQueryService.findLabelingByName(name);
            //     var recallPromise = drugQueryService.findEnforcementReportsByName(name);

            //     var ucname = angular.uppercase(name);
            //     var error = null;

            //     eventPromise.then(
            //         function onFulfilled(data) {
            //             angular.forEach(data.results, function(result) {
            //                 angular.forEach(result.patient.drug, function(drug) {
            //                     if (drug.openfda && drug.openfda.brand_name) {
            //                         angular.forEach(drug.openfda.brand_name, function(brandName) {
            //                             if (angular.uppercase(brandName).includes(ucname)) {
            //                                 drugs.push(drug.openfda);
            //                             }
            //                         });
            //                     }
            //                 });
            //             });
            //         },
            //         function onRejected(error) {
            //             error = error;
            //         }
            //     );
            //     labelPromise.then(
            //         function onFulfilled(data) {
            //             angular.forEach(data.results, function(result) {
            //                 drugs.push(result.openfda);
            //             });
            //         },
            //         function onRejected(error) {
            //             error = error;
            //         }
            //     );
            //     recallPromise.then(
            //         function onFulfilled(data) {
            //             angular.forEach(data.results, function(result) {
            //                 drugs.push(result.openfda);
            //             });
            //         },
            //         function onRejected(error) {
            //             error = error;
            //         }
            //     );

            //     $q.all([eventPromise, labelPromise, recallPromise]).finally(function() {
            //         if (error && drugs.length === 0) {
            //             deferred.reject(error);
            //         } else {
            //             var uniqueDrugs = util.removeDuplicateDrugs(drugs);
            //             console.log('matching drug instances: ' + drugs.length + ', unique: ' + uniqueDrugs.length);
            //             if (uniqueDrugs.length > 100) {
            //                 uniqueDrugs = uniqueDrugs.slice(0, 100);
            //             }
            //             angular.forEach(uniqueDrugs, function(drug) {
            //                 console.log('name: ' + drug.brand_name);
            //             });
            //             deferred.resolve({
            //                 meta: {
            //                     results: {
            //                         skip: 0,
            //                         limit: uniqueDrugs.length,
            //                         total: uniqueDrugs.length,
            //                     }
            //                 },
            //                 results: uniqueDrugs
            //             });
            //         }
            //     });

            //     return deferred.promise;
            // },
            // findDevices: function(name, page) {
            //     return deviceQueryService.findEnforcementReportsByName(name, page);
            // },
            // findFoods: function(name, page) {
            //     return foodQueryService.findEnforcementReportsByName(name, page);
            // },
            findDrugEvents: function(name, page) {
                return drugQueryService.findAdverseEventsByName(name, page);
            },
            findDrugLabeling: function(name, page) {
                return drugQueryService.findLabelingByName(name, page);
            },
            findDrugRecalls: function(name, page) {
                return drugQueryService.findEnforcementReportsByName(name, page);
            },
            getRecentDrugRecalls: function(page) {
                return drugQueryService.findEnforcementReportsByDate(util.getOneYearAgo(), util.getToday(), page);
            },
            getRecentDeviceRecalls: function(page) {
                return deviceQueryService.findEnforcementReportsByDate(util.getOneYearAgo(), util.getToday(), page);
            },
            getRecentFoodRecalls: function(page) {
                return foodQueryService.findEnforcementReportsByDate(util.getTwoMonthsAgo(), util.getToday(), page);
            }
        };
    }]);
