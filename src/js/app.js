'use strict';

angular.module('gothamlane', [
	'ui.router',
	'gothamlane.mainCtrl'
])
.controller('appCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.goHome = function () {
    $state.go('main');
  };
}]);
