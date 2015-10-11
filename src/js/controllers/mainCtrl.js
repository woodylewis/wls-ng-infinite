'use strict';

angular.module('gothamlane.mainCtrl', [
  'infinite-scroll',
  'gothamlane.narrationEngine'
])
.controller('mainCtrl', ['$scope', '$state', '$sce', '$location', '$anchorScroll', '$filter', 'NarrationEngine', 
  function($scope, $state, $sce, $location, $anchorScroll, $filter, NarrationEngine) {
    $scope.ne = new NarrationEngine();
    $scope.cn = {};
    $state.go('main');

    $scope.fetchNarration = function(theID) {
      var filtered = $filter('filter')($scope.ne.narrations, {_id: theID});
      $scope.cn = filtered[0];
      $state.go('narration');
    };
}]);