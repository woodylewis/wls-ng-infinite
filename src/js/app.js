'use strict';

angular.module('gothamlane', [
	'ui.router',
	'gothamlane.mainCtrl'
])
.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
  .hashPrefix('!');

  $stateProvider
    .state('main', {
      url: "/main",
      views: {
        "state" : { templateUrl: "partials/main.html" }
      }
    })
    .state('narration', {
      url: "/narration",
      views: {
        "state" : { templateUrl: "partials/narration.html" }
      }
    })
    .state('referral', {
      url: "/narration/:narrationUrl",
      views: {
        "state" : { 
                    templateUrl: "partials/narration.html" ,
                    controller: function ($scope) {
                      //$scope.$emit('referral');
                      if($scope.$parent.ctl.click === true) {
                        $scope.$parent.ctl.click = false;
                      }
                      else {
                        $scope.$emit('referral');
                        //$scope.$parent.ctl.fetchUrl();
                      }
                    }
              }
        }
    });
}])
.controller('appCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.goHome = function () {
    $state.go('main');
  };
}]);
