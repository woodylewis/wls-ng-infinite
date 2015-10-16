'use strict';

angular
.module('gothamlane.mainCtrl', [
  'infinite-scroll',
  'gothamlane.narrationEngine'
])
.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $state, $filter, NarrationEngine) {
  var vm = this;
  vm.ne = new NarrationEngine();
  vm.cn = {};
  $state.go('main');

  vm.fetchNarration = function(theID) {
    var filtered = $filter('filter')(vm.ne.narrations, {_id: theID});
    vm.cn = filtered[0];
    $state.go('narration');
  };

  vm.fetchUrl = function() {
    console.log('fetchUrl');
  };
}