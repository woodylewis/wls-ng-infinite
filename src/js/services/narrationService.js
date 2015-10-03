'use strict';

angular.module('gothamlane.narrationService', [])
/* SERVICE TO WRAP HTTP REQUESTS */
.factory('narrationService' , ['$q', '$http', 
	function($q, $http) {
		var narrationUrl = 'http://gothamlane.net:7100/narrations/';

		var fetchNarrations = function() {
			var deferred = $q.defer();

			$http.get(narrationUrl)
			.success( function(data) {
				deferred.resolve(data);
			})
			.error(function(reason) {
				deferred.reject(reason);
			});
			return deferred.promise;
		};

		var fetchCurrentNarration = function(_id) {
			var deferred = $q.defer();
			$http.get(narrationUrl + _id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(reason) {
				deferred.reject(reason);
			});
			return deferred.promise;
		};

		var transformRequestAsFormPost = function(obj) {
	        var str = [];
	        for(var p in obj)
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        	return str.join("&");
		};

	return {
		fetchNarrations: function() {
			return fetchNarrations();
		},
		fetchCurrentNarration: function(_id) {
			return fetchCurrentNarration(_id);
		}
	};
}]);