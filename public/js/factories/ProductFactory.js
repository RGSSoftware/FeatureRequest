angular.module('ProductFactory',  ['ngResource'])
	
	.factory('ProductFactory', function($resource) {
		
		return $resource('/api/products', {}, {
			getAll: {method:'GET', params:{}, isArray:true},
			getWithId: {method:'GET', isArray:true}
		});
	});
