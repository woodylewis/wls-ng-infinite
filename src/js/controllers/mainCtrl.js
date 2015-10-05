'use strict';

angular.module('gothamlane.mainCtrl', [
  'infinite-scroll',
  'gothamlane.narrationEngine'
])
.controller('mainCtrl', ['$scope', '$state', 'NarrationEngine', function($scope, $state, NarrationEngine) {
  $scope.ne = new NarrationEngine();
  $state.go('main');
}]);