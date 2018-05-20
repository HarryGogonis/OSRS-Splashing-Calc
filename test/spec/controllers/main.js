'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('osrssplashCalcApp'));

  var MainCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should calculate xp per hour', function () {
    expect(scope.mind.xpHr).toBe(13800);
    expect(scope.chaos.xpHr).toBe(27000);
    expect(scope.death.xpHr).toBe(41400);
    expect(scope.blood.xpHr).toBe(51000);
  });
});
