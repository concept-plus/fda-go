'use strict';

describe('Controller: ResultsCtrl', function () {

  // load the controller's module
  beforeEach(module('fdagoApp'));

  var Results;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    Results = $injector.get('ResultsCtrl');
  }));

  // it('should be defined', function() {
  //   expect(Results).toBeDefined();
  // });

});
