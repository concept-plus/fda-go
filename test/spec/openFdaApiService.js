'use strict';

describe('Factory: openFdaServices', function () {

  // load the module
  beforeEach(module('openFdaServices'));

  var QueryService;
  beforeEach(inject(function (_openFdaQueryService_) {
    QueryService = _openFdaQueryService_;
  }));



  it('', function() {
    expect(QueryService).toBeDefined();
  });


});
