angular.module('FeatureListController', ['ngMaterial','ngMessages', 'ngMdIcons'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
                          .primaryPalette('blue-grey')
                          
})

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http', '$mdDialog','FeatureFactory', 'ClientFactory', function($scope, $http, $mdDialog, FeatureFactory, ClientFactory) {
		$scope.formData = {};
		$scope.loading = true;
		
		
        var clients = ['client 1', 'client 2'];
		
		FeatureFactory.getAll()
			.success(function(data) {
				$scope.features = data;
				$scope.loading = false;
			});
		
		
		$scope.doPrimaryAction = function(event) {
			$mdDialog.show(
				$mdDialog.alert()
				.title('Primary Action')
				.textContent('Primary actions can be used for one click actions')
				.ariaLabel('Primary click demo')
				.ok('Awesome!')
				
			);
		};
		
        
		$scope.showAdd = function(ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'newReqestDialog.html',
				targetEvent: ev,
				locals : {
                    clients : clients,
					FeatureFactory : FeatureFactory,
                    ClientFactory : ClientFactory,
                },
			});
		};
	}]);
	
	function DialogController($scope, $mdDialog, clients, FeatureFactory, ClientFactory) {
		$scope.client = '';
		$scope.clients = clients;
		
		$scope.targetDate = new Date();
        
        ClientFactory.getAll()
			.success(function(data) {
				$scope.clients = data;
			});
		
		 $scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	};
	
	






