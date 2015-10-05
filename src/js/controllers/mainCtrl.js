'use strict';

angular.module('gothamlane.mainCtrl', [
  'gothamlane.narrationEngine'
])
.controller('mainCtrl', ['$scope', 'NarrationEngine', function($scope, NarrationEngine) {
  $scope.ne = new NarrationEngine();
}]);