'use strict';

angular.module('gothamlane.mainCtrl', [
  'infinite-scroll',
  'gothamlane.narrationEngine'
])
.controller('mainCtrl', ['$scope', '$state', 'NarrationEngine', function($scope, $state, NarrationEngine) {
  $scope.ne = new NarrationEngine();
  $state.go('main');

  $scope.showCurrentNarration = function(_id) {
  	//--- Need access to the promise in NarrationService ------
  	return $scope.ne.ns.fetchCurrentNarration(_id)
    .then(function (cn) {
    	$scope.currentNarration = cn;
    	$state.go('narration');
    });
  };
}]);