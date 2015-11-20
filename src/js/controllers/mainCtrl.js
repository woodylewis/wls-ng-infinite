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
  vm.mock = [];
  var m = '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=gothamlane1-20&marketplace=amazon&region=US&placement=B004KZP0WY&asins=B004KZP0WY&linkId=YJUJ24KK4Y7KG2SZ&show_border=true&link_opens_in_new_window=true"></iframe>';

  m = $sce.trustAsHtml(m);
  vm.mock.push(m);

  $scope.$on('referral', function(event, args) {
    if(vm.click === true) {
      vm.click = false;
    }
    else {
      vm.fetchUrl(args);
    }
  });

  function trustMarkup() {
    vm.markup = $sce.trustAsHtml(vm.cn.body);
  }

  vm.fetchNarration = function(theID) {
    var filtered = $filter('filter')(vm.ne.narrations, {_id: theID});
    vm.cn = filtered[0];
    trustMarkup();
    vm.click = true;
    $location.url('/narration/' + vm.cn.url);
  };

  vm.fetchUrl = function(theUrl) {
    vm.ne.fetchNarrationUrl(theUrl)
    .then(function (data) {
      vm.cn = data[0];
      trustMarkup();
    });
  };
}