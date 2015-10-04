'use strict';

angular.module('gothamlane.mainCtrl', [
  'gothamlane.narrationService'
])
.controller('mainCtrl', ['$scope', 'narrationService', 'Reddit', function($scope, narrationService, Reddit) {
  $scope.reddit = new Reddit();
  $scope.items = [];
  $scope.busy = false;
  
  $scope.showCurrentNarration = function(_id) {
    narrationService.fetchCurrentNarration(_id)
    .then(function(data) {
      $scope.currentNarration = data;
      //$state.go('narration');
    }), function(error) {
      console.log('show narration error');
    };
  };

  $scope.nextNarrations = function() {
    if($scope.busy) {
      return;
    }
    $scope.busy = true;

    narrationService.fetchNarrations()
    .then(function (narrations) {
      for(var i=0; i < narrations.length; i++) {
        $scope.items.push(narrations[i]);
      }
      $scope.busy = false;
      //$state.go('main');
    }), function(error) {
        var errStr = 'fetchNarrations error';
        console.log(errStr + error);
    };
  };

}])
.factory('Reddit', function($http) {
  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
    $http.jsonp(url).success(function(data) {
      var items = data.data.children;
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i].data);
      }
      this.after = "t3_" + this.items[this.items.length - 1].id;
      this.busy = false;
    }.bind(this));
  };

  return Reddit;
});