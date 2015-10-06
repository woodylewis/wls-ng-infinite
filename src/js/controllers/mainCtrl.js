'use strict';

angular.module('gothamlane.mainCtrl', [
  'infinite-scroll',
  'gothamlane.narrationEngine'
])
.controller('mainCtrl', ['$scope', '$state', 'NarrationEngine', function($scope, $state, NarrationEngine) {
  $scope.ne = new NarrationEngine();
  $state.go('main');

  $scope.showCurrentNarration = function(id) {
  	$scope.ne.fetchCurrentNarration(id)
    .then(function (cn) {
    	$scope.currentNarration = cn;
    	$state.go('narration');
    }), function (error) {
      console.log('showCurrentNarration error');
    };
  };
}]);