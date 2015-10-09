'use strict';

angular.module('gothamlane.mainCtrl', [
  'infinite-scroll',
  'gothamlane.narrationEngine'
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main', {
      url: "/main",
      views: {
        "state" : { templateUrl: "partials/main.html" }
      }
    })
    .state('narration', {
      url: "/narration",
      views: {
        "state" : { 
                    templateUrl: "partials/narration.html" ,
                    controller: function($scope, $sce, $anchorScroll, $location) {
                      $scope.$parent.markup = $sce.trustAsHtml($scope.$parent.cn.body);
                      $location.url($scope.$parent.cn.url);
                      //$location.hash('top');
                      //$anchorScroll();
                    }
            }
        }
    })
    /*
    .state('referral', {
      url: "/:narrationUrl",
      views: {
        "state" : { 
                    templateUrl: "partials/narration.html" ,
                    controller: function ($scope, $filter, $stateParams) {
                    var filtered = $filter('filter')($scope.posts, {url: $stateParams.narrationUrl});
                    console.log('IN REFERRAL STATE CONTROLLER');
                    $scope.parent.cn = filtered[0];
                    }
              }
        }
    })*/;
}])
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