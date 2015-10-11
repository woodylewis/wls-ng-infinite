'use strict';

angular.module('gothamlane', [
	'ui.router',
	'gothamlane.mainCtrl'
])
.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
  .hashPrefix('!');

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
.controller('appCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.goHome = function () {
    $state.go('main');
  };
}]);
