'use strict';

describe('Factory: services', function () {

  // load the module
  beforeEach(module('services'));

  var QueryService;
  beforeEach(inject(function (_fdaGoQueryService_) {
    QueryService = _fdaGoQueryService_;
  }));



  it('', function() {
    expect(QueryService).toBeDefined();
  });


});
