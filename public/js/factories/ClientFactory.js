angular.module('ClientFactory', [])
 
	.factory('ClientFactory', ['$http',function($http) {
		return {
			getAll : function() {
				return $http.get('/api/clients');
			}
			
		}
	}]);
