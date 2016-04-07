angular.module('featureFactory', [])

	// super simple service
	// each function returns a promise object 
	.factory('FeatureFactory', ['$http',function($http) {
		return {
			getAll : function() {
				
				return $http.get('/api/features');
			}
			
		}
	}]);