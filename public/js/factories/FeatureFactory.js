angular.module('featureFactory', [])
 
	.factory('FeatureFactory', ['$http',function($http) {
		return {
			getAll : function() {
				return $http.get('/api/features');
			}
			
		}
	}]);