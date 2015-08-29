'use strict';

/**
 * @ngdoc overview
 * @name osrssplashCalcApp
 * @description
 * # osrssplashCalcApp
 *
 * Main module of the application.
 */
angular
  .module('osrssplashCalcApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

'use strict';

/**
 * @ngdoc function
 * @name osrssplashCalcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the osrssplashCalcApp
 */
angular.module('osrssplashCalcApp')
  .controller('MainCtrl', function ($http, $scope) {
    var ge = "https://api.rsbuddy.com/grandExchange?a=guidePrice&i="
    var splashesPerHour = 1200
    var castXp = {
      mind: 11.5,
      chaos : 22.5,
      death : 34.5,
      blood: 42.5
    }

    var getXpHr = function(xp) { return splashesPerHour * xp }
    var getGpHr = function(gp) { return splashesPerHour * gp }

    var getXpForLevel = function(targetLevel, currentXP) {
      var sum = 0
      for (var i=1; i<targetLevel; i++) {
        sum += Math.floor( i + 300 * Math.pow(2,(i/7)) )
      }
      var targetXP = Math.floor(sum/4)
      return targetXP - currentXP
    }

    var updateMindCalcs = function() {
      var mindLeft = Math.ceil($scope.xp.left/$scope.mind.xp)
      $scope.mind.totalCost = $scope.mind.gp * mindLeft
      $scope.mind.castsLeft = mindLeft
      $scope.mind.timeLeft = mindLeft / splashesPerHour
    }
    var updateChaosCalcs = function() {
      var chaosLeft = Math.ceil($scope.xp.left/$scope.chaos.xp)
      $scope.chaos.totalCost = $scope.chaos.gp * chaosLeft
      $scope.chaos.castsLeft = chaosLeft
      $scope.chaos.timeLeft = chaosLeft / splashesPerHour
    }
    var updateDeathCalcs = function() {
      var deathLeft = Math.ceil($scope.xp.left/$scope.death.xp)
      $scope.death.totalCost = $scope.death.gp * deathLeft
      $scope.death.castsLeft = deathLeft
      $scope.death.timeLeft = deathLeft / splashesPerHour
    }
    var updateBloodCalcs = function() {
      var bloodLeft = Math.ceil($scope.xp.left/$scope.blood.xp)
      $scope.blood.totalCost = $scope.blood.gp * bloodLeft
      $scope.blood.castsLeft = bloodLeft
      $scope.blood.timeLeft = bloodLeft / splashesPerHour
    }
    var updateRuneCalcs = function () {
      updateMindCalcs()
      updateChaosCalcs()
      updateDeathCalcs()
      updateBloodCalcs()
    }

    $scope.xp = {
      'current' : 1000000,
      'target'  : 94,
      'left'    : 0
    }

    $scope.mind = {
      gp    : 0,
      xp    : castXp.mind,
      xpHr  : getXpHr(castXp.mind),
      gpHr  : 0,
      totalCost : 0,
      castsLeft : 0,
      timeLeft  : 0
    }
    $scope.chaos = {
      gp    : 0,
      xp    : castXp.chaos,
      xpHr  : getXpHr(castXp.chaos),
      gpHr  : 0,
      totalCost : 0,
      castsLeft : 0,
      timeLeft  : 0
    }
    $scope.death = {
      gp    : 0,
      xp    : castXp.death,
      xpHr  : getXpHr(castXp.death),
      gpHr  : 0,
      totalCost : 0,
      castsLeft : 0
    }
    $scope.blood = {
      gp    : 0,
      xp    : castXp.blood,
      xpHr  : getXpHr(castXp.blood),
      gpHr  : 0,
      totalCost : 0,
      castsLeft : 0
    }
    $scope.$watch('mind.gp', function() {
      $scope.mind.gpHr = $scope.mind.gp * splashesPerHour
      updateMindCalcs()
    });
    $scope.$watch('chaos.gp', function() {
      $scope.chaos.gpHr = $scope.chaos.gp * splashesPerHour
      updateChaosCalcs()
    });
    $scope.$watch('death.gp', function() {
      $scope.death.gpHr = $scope.death.gp * splashesPerHour
      updateDeathCalcs()
    });
    $scope.$watch('blood.gp', function() {
      $scope.blood.gpHr = $scope.blood.gp * splashesPerHour
      updateBloodCalcs()
    });
    $scope.$watch('xp.current', function() {
      $scope.xp.left = getXpForLevel($scope.xp.target, $scope.xp.current)
      updateRuneCalcs()
    });
    $scope.$watch('xp.target', function() {
      $scope.xp.left = getXpForLevel($scope.xp.target, $scope.xp.current)
      updateRuneCalcs()
    });

    // OSBuddy API Requests
    $http.get(ge + "558")
      .then(function(res) {
          $scope.mind.gp = res.data.overall
      }, function(res) {
          console.log(res)
      })
    $http.get(ge + "562")
      .then(function(res) {
          $scope.chaos.gp = res.data.overall
      }, function(res) {
            console.log(res)
      })
    $http.get(ge + "560")
      .then(function(res) {
          $scope.death.gp = res.data.overall
      }, function(res) {
            console.log(res)
      })
    $http.get(ge + "565")
      .then(function(res) {
          $scope.blood.gp = res.data.overall
      }, function(res) {
            console.log(res)
      })

  });

'use strict';

/**
 * @ngdoc function
 * @name osrssplashCalcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the osrssplashCalcApp
 */
angular.module('osrssplashCalcApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
