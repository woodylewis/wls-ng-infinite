'use strict';

angular
.module('gothamlane.mainCtrl', [
  'infinite-scroll',
  'gothamlane.narrationEngine'
])
.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $state, $filter, $location, $sce, NarrationEngine) {
  var vm = this;
  vm.ne = new NarrationEngine();
  vm.cn = {};
  vm.click = false;

  $state.go('main');

  vm.fetchNarration = function(theID) {
    var filtered = $filter('filter')(vm.ne.narrations, {_id: theID});
    vm.cn = filtered[0];
    vm.click = true;
    vm.markup = $sce.trustAsHtml(vm.cn.body);
    $location.url('narration/' + vm.cn.url);
    $state.go('narration');
  };

  vm.fetchUrl = function() {
    console.log('fetchUrl');
  };
}