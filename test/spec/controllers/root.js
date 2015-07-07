'use strict';

describe('Controller: RootCtrl', function () {

  // load the controller's module
  beforeEach(module('fdagoApp'));

  var RootCtrl, scope;
  var q = 'albuterol';
  var category = 'drug';

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RootCtrl = $controller('RootCtrl', {
      $scope: scope
    });
  }));

  // submit search test
  it('should be an invalid search if no query is provided', function () {
    scope.submitSearchSidebar();
    expect(scope.invalid).toBe(true);
  });

  it('should be an valid search if a query is provided', function () {
    scope.submitSearchSidebar(q);
    expect(scope.invalid).toBe(false);
  });

  it('should have a category of "drug" for a valid search', function () {
    scope.submitSearchSidebar(q);
    expect(scope.category).toBe(category);
  });
});
