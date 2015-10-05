'use strict';

angular.module('gothamlane', [
	'ui.router',
	'gothamlane.mainCtrl'
])
.config(['$stateProvider', function($stateProvider) {
	$stateProvider
    .state('main', {
      url: "/main",
      views: {
        "state" : { templateUrl: "partials/main.html" }
      }
    });
}])
.controller('appCtrl', ['$scope', '$state', function($scope, $state) {
	console.log('appCtrl');
	
  $scope.goHome = function () {
    $state.go('main');
  };
}]);
