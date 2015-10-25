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
      url: "/",
      views: {
        "state" : { templateUrl: "partials/main.html" }
      }
    })
    .state('referral', {
      url: "/narration/:narrationUrl",
      views: {
        "state" : { 
                    templateUrl: "partials/narration.html" ,
                    controller: function ($scope, $stateParams) {
                        $scope.$emit('referral', $stateParams.narrationUrl);
                    }
              }
        }
    });
}])
.run(['$state', function($state) {
  $state.go('main');
}])
.controller('appCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.goHome = function () {
    $state.go('main');
  };
}]);
