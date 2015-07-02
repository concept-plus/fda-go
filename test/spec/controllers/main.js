'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('fdagoApp'));

  var MainCtrl, RootCtrl, scope;
  var q = 'albuterol';

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
    RootCtrl = $controller('RootCtrl', {
      $scope: scope
    });
  }));
  // submit search test
  it('should be an invalid search if no query is provided', function () {
    scope.submitSearch();
    expect(scope.invalid).toBe(true);
  });

  it('should be an valid search if a query is provided', function () {
    scope.submitSearch(q);
    expect(scope.invalid).toBe(false);
  });

});
