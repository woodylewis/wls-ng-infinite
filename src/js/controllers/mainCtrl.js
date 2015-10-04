'use strict';

angular.module('gothamlane.mainCtrl', [
  'gothamlane.narrationService'
])
.controller('mainCtrl', ['$scope', 'narrationService', 'NarrationEngine', function($scope, narrationService, NarrationEngine) {
  $scope.narrationEngine = new NarrationEngine();
}])
.factory('NarrationEngine', function($http, narrationService) {
  var NarrationEngine = function() {
    this.items = [];
    this.busy = false;
  };

  NarrationEngine.prototype.nextNarrations = function() {
    if(this.busy) return;
    this.busy = true;

    narrationService.fetchNarrations()
    .then(function (narrations) {
      for(var i=0; i < narrations.length; i++) {
        this.items.push(narrations[i]);
      }
      this.busy = false;
      //$state.go('main');
    }.bind(this));
  };

  return NarrationEngine;
});