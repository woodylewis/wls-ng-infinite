'use strict';

angular.module('gothamlane.narrationEngine', [
  'gothamlane.narrationService'
])
.factory('NarrationEngine', ['narrationService', function(narrationService) {
  var NarrationEngine = function() {
    this.items = [];
    this.busy = false;
    this.ns = narrationService;
    this.id = 'n';
  };

  NarrationEngine.prototype.nextNarrations = function() {
    if(this.busy) return;
    this.busy = true;

    this.ns.fetchNarrationPage(this.id)
    .then(function (narrations) {
      for(var i=0; i < narrations.length; i++) {
        this.items.push(narrations[i]);
      }
      this.busy = false;
      this.id = narrations[narrations.length - 1]._id;
      //$state.go('main');
    }.bind(this));
  };

  return NarrationEngine;
}]);