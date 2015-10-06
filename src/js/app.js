'use strict';

angular.module('gothamlane', [
	'ui.router',
	'gothamlane.mainCtrl'
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
      url: "/narration/:narrationId",
      views: {
        "state" : { 
                    templateUrl: "partials/narration.html",
                    controller: function($scope, $sce, $location, $anchorScroll) {
          console.log($scope.$parent.currentNarration);
                      $scope.markup = $sce.trustAsHtml($scope.$parent.currentNarration.body);
                      $scope.title = $scope.$parent.currentNarration.title;
                      $scope.date = $scope.$parent.currentNarration.date;
                      $scope.category = $scope.$parent.currentNarration.category;
                      $location.url($scope.$parent.currentNarration.url);
                      $location.hash('top');
                      $anchorScroll();
                    }
                  }
       }
    });
}])
.controller('appCtrl', ['$scope', '$state', function($scope, $state) {
	console.log('appCtrl');
	
  $scope.goHome = function () {
    $state.go('main');
  };
}]);
