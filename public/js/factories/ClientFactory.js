angular.module('ClientFactory', ['ngResource'])
 
	.factory('ClientFactory', function($resource) {
		
		return $resource('/api/clients', {}, {
			getAll: {method:'GET', params:{}, isArray:true},
			getWithId: {method:'GET', isArray:true}
		});
	});

