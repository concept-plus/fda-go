'use strict';

describe('Controller: ResultsCtrl', function () {

  // load the controller's module
  beforeEach(module('fdagoApp'));

  var scope, $location, createController, mockQueryService, mockUtil;

  function initMocks($q) {
        mockQueryService = {
            findDrugEvents: function(search) {
                // console.log("CALLED FINDDRUGEVENTS with " + search);
                var deferred = $q.defer();
                deferred.resolve({
                    meta: { results: { total: 125 } },
                    results: [
                        {
                            transmissiondate: '20150601',
                            patient: {
                                patientsex: '1',
                                reaction: [
                                    { reactionmeddrapt: 'death', reactionoutcome: '1' }
                                ],
                                drug: [
                                    { openfda: { brand_name: ['aspirin', 'teds awesome aspirin'] } }
                                ]
                            }
                        }
                    ]
                });
                return deferred.promise;
            },
            findDrugLabeling: function(search) {
                // console.log("CALLED FINDDRUGLABELING with " + search);
                var deferred = $q.defer();
                deferred.resolve({
                    meta: { results: { total: 125 } },
                    results: [
                        {
                            controlled_substance: ['controlled'],
                            recent_major_changes: ['stuff changed'],
                            effective_time: '20150601',
                            openfda: { brand_name: ['aspirin'] }
                        }
                    ]
                });
                return deferred.promise;
            },
            findDrugRecalls: function(search) {
                // console.log("CALLED FINDDRUGRECALLS with " + search);
                var deferred = $q.defer();
                deferred.resolve({
                    meta: { results: { total: 125 } },
                    results: [
                        {
                            recall_initiation_date: '20150601',
                            product_description: 'product desc',
                            reason_for_recall: 'something bad was wrong',
                            recalling_firm: 'acme ltd',
                            openfda: { brand_name: ['aspirin']}
                        }
                    ]
                });
                return deferred.promise;
            },
            findRecentDrugRecalls: function() {
                var deferred = $q.defer();
                deferred.resolve({
                    meta: { results: { total: 125 } },
                    results: [
                        {
                            recall_initiation_date: '20150601',
                            product_description: 'product desc',
                            reason_for_recall: 'something bad was wrong',
                            recalling_firm: 'acme ltd',
                            openfda: { brand_name: ['aspirin']}
                        }
                    ]
                });
                return deferred.promise;
            },
            findRecentDeviceRecalls: function() {
                var deferred = $q.defer();
                deferred.resolve({
                    meta: { results: { total: 125 } },
                    results: [
                        {
                            recall_initiation_date: '20150601',
                            product_description: 'product desc',
                            reason_for_recall: 'something bad was wrong',
                            recalling_firm: 'acme ltd',
                            openfda: { brand_name: ['inhaler']}
                        }
                    ]
                });
                return deferred.promise;
            },
            findRecentFoodRecalls: function() {
                var deferred = $q.defer();
                deferred.resolve({
                    meta: { results: { total: 125 } },
                    results: [
                        {
                            recall_initiation_date: '20150601',
                            product_description: 'product desc',
                            reason_for_recall: 'something bad was wrong',
                            recalling_firm: 'blue bell creameries',
                            openfda: { brand_name: ['blue bell']}
                        }
                    ]
                });
                return deferred.promise;
            }
        };
        mockUtil = {
            removeDuplicateDrugs: function(drugs) {
                return drugs;
            }
        };
    };

  beforeEach(function() {
    module(function ($provide) {
        $provide.value('fdaGoQueryService', mockQueryService);
        $provide.value('queryUtil', mockUtil);
    });

    inject(function ($rootScope, $controller, _$location_, _$q_, $timeout) {
        $location = _$location_;
        $location.path('/results/drug/aspirin')
        scope = $rootScope.$new();

        initMocks(_$q_);

        spyOn(mockQueryService, 'findDrugEvents').and.callThrough();
        spyOn(mockQueryService, 'findDrugLabeling').and.callThrough();
        spyOn(mockQueryService, 'findDrugRecalls').and.callThrough();

        createController = function() {
            return $controller('ResultsCtrl', {
                // '$q': _$q_,
                '$rootScope': $rootScope,
                '$scope': scope,
                '$location': $location,
                'fdaGoQueryService': mockQueryService,
                'util': mockUtil,
                '$timeout': $timeout
            });
        };
    });
  });

  it('should be defined', function() {
    var results = createController();
    expect(results).toBeDefined();
  });

  // test initialization / queries / dom

  it('should submit 3 queries based on search results when drug search is used', function() {
    var results = createController();
    expect(mockQueryService.findDrugEvents).toHaveBeenCalledWith('aspirin');
    expect(mockQueryService.findDrugLabeling).toHaveBeenCalledWith('aspirin');
    expect(mockQueryService.findDrugRecalls).toHaveBeenCalledWith('aspirin');
  });

  it('should display search results in the tables', function() {
    // var results = createController();
    // expect($('#event-results-table tbody tr')).toHaveLength(1);
    // expect($('#label-results-table tbody tr')).toHaveLength(1);
    // expect($('#recall-results-table tbody tr')).toHaveLength(1);
  });

  // test massageEventData

  it('massageEventData should add fdago element with matching brand names', function() {
    var results = createController();
    var data = {
        results: [
            { patient: { drug: [
                { openfda: { brand_name: ['aspirin'] } },
                { openfda: { brand_name: ['aspirin extra strength'] } },
                { openfda: { brand_name: ['motrin'] } }
            ] } },
            { patient: { drug: [
                { openfda: { brand_name: ['aspirin'] } }
            ] } },
            { patient: { drug: [
                { openfda: { brand_name: ['tylenol'] } }
            ] } }
        ]
    };
    scope.massageEventData(data);
    expect(data.results[0].fdago).toBeDefined();
    expect(data.results[0].fdago.matchingBrandNames).toEqual(['aspirin', 'aspirin extra strength']);
    expect(data.results[1].fdago).toBeDefined();
    expect(data.results[1].fdago.matchingBrandNames).toEqual(['aspirin']);
    expect(data.results[2].fdago).toBeDefined();
    expect(data.results[2].fdago.matchingBrandNames).toEqual([]);
  });

  // test formatArray

  it('formatArray should work with an empty array', function() {
    var results = createController();
    expect(scope.formatArray([])).toBe('');
  });

  it('formatArray should work with a 1-item array', function() {
    var results = createController();
    expect(scope.formatArray([1])).toBe('1');
  });

  it('formatArray should work with a bigger array', function() {
    var results = createController();
    expect(scope.formatArray([1,2,3,4,5])).toBe('1, 2, 3, 4, 5');
  });

  // test toDate

  it('should convert a yyyymmdd string to a valid js date', function() {
    var results = createController();
    var date = scope.toDate('20150614');
    console.log(date.toString());
    expect(date.getFullYear()).toBe(2015);
    expect(date.getMonth()).toBe(5);
    expect(date.getDate()).toBe(14);
  });

  // test getPatientReaction

  it('getPatientReaction should work with no reaction info', function() {
    var results = createController();
    var reaction = scope.getPatientReaction({
        patient: {
            reaction: []
        }
    });
    expect(reaction).toBe('');
  });

  it('getPatientReaction should work with a bunch of reactions', function() {
    var results = createController();
    var reaction = scope.getPatientReaction({
        patient: {
            reaction: [
                { reactionmeddrapt: 'death', reactionoutcome: '1' },
                { reactionmeddrapt: 'hives', reactionoutcome: '3' },
                { reactionmeddrapt: 'knee pain', reactionoutcome: '0' },
                { reactionmeddrapt: 'runny nose', reactionoutcome: '5' },
                { reactionmeddrapt: 'irritable bowels', reactionoutcome: '4' },
                { reactionmeddrapt: 'zombie', reactionoutcome: '2' }
            ]
        }
    });
    expect(reaction).toBe('death, hives (Did not recover), knee pain, runny nose (Fatal), irritable bowels (Recovered with sequelae), zombie');
  });

  // test getPatientDemographics

  it('getPatientDemographics should work when no data', function() {
    var results = createController();
    var demog = scope.getPatientDemographics({
        patient: { }
    });
    expect(demog).toBe('');
  });

  it('getPatientDemographics should only include the data fields available', function() {
    var results = createController();

    var demog1 = scope.getPatientDemographics({
        patient: {
            patientsex: '1'
        }
    });
    expect(demog1).toBe('Male');

    var demog2 = scope.getPatientDemographics({
        patient: {
            patientsex: '2',
            patientonsetage: '40',
            patientonsetageunit: '801'
        }
    });
    expect(demog2).toBe('Female, 40 years old');

    var demog3 = scope.getPatientDemographics({
        patient: {
            patientsex: '2',
            patientonsetage: '40',
            patientonsetageunit: '801',
            patientweight: '65'
        }
    });
    expect(demog3).toBe('Female, 40 years old, 143lbs');

    var demog4 = scope.getPatientDemographics({
        patient: {
            patientonsetage: '40',
            patientonsetageunit: '801',
            patientweight: '65'
        }
    });
    expect(demog4).toBe('40 years old, 143lbs');
  });

  it('getPatientDemographics should format age based on age unit', function() {
    var results = createController();

    var demog1 = scope.getPatientDemographics({
        patient: {
            patientonsetage: '5',
            patientonsetageunit: '800'
        }
    });
    expect(demog1).toBe('50s');

    var demog2 = scope.getPatientDemographics({
        patient: {
            patientonsetage: '5',
            patientonsetageunit: '801'
        }
    });
    expect(demog2).toBe('5 years old');

    var demog3 = scope.getPatientDemographics({
        patient: {
            patientonsetage: '5',
            patientonsetageunit: '802'
        }
    });
    expect(demog3).toBe('5 months old');

    var demog4 = scope.getPatientDemographics({
        patient: {
            patientonsetage: '5',
            patientonsetageunit: '803'
        }
    });
    expect(demog4).toBe('5 weeks old');

    var demog5 = scope.getPatientDemographics({
        patient: {
            patientonsetage: '5',
            patientonsetageunit: '804'
        }
    });
    expect(demog5).toBe('5 days old');

    var demog6 = scope.getPatientDemographics({
        patient: {
            patientonsetage: '5',
            patientonsetageunit: '805'
        }
    });
    expect(demog6).toBe('5 hours old');
  });

});
