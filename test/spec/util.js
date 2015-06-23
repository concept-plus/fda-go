'use strict';

describe('Factory: queryUtil', function () {

  // load the module
  beforeEach(module('utilities'));

  var Util;
  beforeEach(inject(function (_queryUtil_) {
    Util = _queryUtil_;
  }));

  // test getToday

  it('should return todays date in YYYYMMDD format', function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var today = Util.getToday();
    expect(today.length).toBe(8);
    expect(today).toBe('' + year + (month < 10 ? '0' + month : month) + (day < 10 ? '0' + day : day));
  });

  // test getOneYearAgo

  it('should return todays date from a year ago in YYYYMMDD format', function() {
    var now = new Date();
    var year = now.getFullYear() - 1;
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var today = Util.getOneYearAgo();
    expect(today.length).toBe(8);
    expect(today).toBe('' + year + (month < 10 ? '0' + month : month) + (day < 10 ? '0' + day : day));
  });

  // test removeDuplicateDrugs

  it('should work on an empty array', function() {
    var uniqueDrugs = Util.removeDuplicateDrugs([]);
    expect(uniqueDrugs.length).toBe(0);
  });

  it('should return everything if there are no duplicates', function() {
    var drugs = [
        {
            substance_name: 'tylenol'
        }, {
            substance_name: 'metformin'
        }, {
            substance_name: 'aspirin'
        }, {
            substance_name: 'cocain'
        }
    ];
    var uniqueDrugs = Util.removeDuplicateDrugs(drugs);

    expect(uniqueDrugs.length).toBe(drugs.length);
    expect(uniqueDrugs).toContain(drugs[0]);
    expect(uniqueDrugs).toContain(drugs[1]);
    expect(uniqueDrugs).toContain(drugs[2]);
    expect(uniqueDrugs).toContain(drugs[3]);
  });

  it('should remove duplicates there are only a few drugs', function() {
    var drugs = [
        {
            substance_name: 'tylenol'
        }, {
            substance_name: 'tylenol'
        }
    ];
    var uniqueDrugs = Util.removeDuplicateDrugs(drugs);

    expect(uniqueDrugs.length).toBe(1);
    expect(uniqueDrugs[0].substance_name).toBe('tylenol');
  });

  it('should remove duplicates when there are a bunch of drugs', function() {
    var tylenol = { substance_name: 'tylenol' };
    var aspirin = { substance_name: 'aspirin' };
    var metformin = { substance_name: 'metformin' };
    var cocain = { substance_name: 'cocain' };
    var drugs = [
        tylenol,
        tylenol,
        aspirin,
        metformin,
        aspirin,
        tylenol,
        aspirin,
        aspirin,
        cocain,
        aspirin,
        tylenol
    ];
    var uniqueDrugs = Util.removeDuplicateDrugs(drugs);

    expect(uniqueDrugs.length).toBe(4);
    expect(uniqueDrugs).toContain(aspirin);
    expect(uniqueDrugs).toContain(tylenol);
    expect(uniqueDrugs).toContain(metformin);
    expect(uniqueDrugs).toContain(cocain);
  });


  // test buildQueryString

  it('should return an empty string if no params', function() {
    expect(Util.buildQueryString()).toBe('');
  });

  it('should return an empty string if no params', function() {
    expect(Util.buildQueryString([])).toBe('');
  });

  it('should handle 1 query param', function() {
    expect(Util.buildQueryString([
        {
            name: 'a',
            value: '1'
        }
    ])).toBe('?a=1');
  });

  it('should handle multiple query params', function() {
    expect(Util.buildQueryString([
        {
            name: 'a',
            value: '1'
        }, {
            name: 'b',
            value: '2'
        }, {
            name: 'c',
            value: '3'
        }
    ])).toBe('?a=1&b=2&c=3');
  });

});
