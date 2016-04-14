angular.module('featureFactory', ['ngResource'])
 
	.factory('FeatureFactory', function($resource) {
		
		return $resource('/api/features', {}, {
			getAll: {method:'GET', params:{}, isArray:true},
			getWith: {method:'GET', isArray:true},
			create: {method:'POST',isArray:true}
		});
	});