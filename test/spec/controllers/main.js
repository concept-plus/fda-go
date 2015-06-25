'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('fdagoApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  // it('should have no items to start', function () {
  //   expect(scope.search.length).toBe(0);
  // });

});
