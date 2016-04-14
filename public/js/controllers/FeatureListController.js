angular.module('FeatureListController', ['ngMaterial','ngMessages', 'ngMdIcons'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
                          .primaryPalette('blue-grey')
                          
})
	.controller('mainController', ['$scope','$http', '$mdDialog','FeatureFactory', 'ClientFactory', 'ProductFactory',
                                   function($scope, $http, $mdDialog, FeatureFactory, ClientFactory, ProductFactory) {
		
		$scope.features = FeatureFactory.getAll();
		
		$scope.showDetailFeature = function(feature) {
          
			$mdDialog.show({
				controller: FeatureDetailController,
				templateUrl: 'FeatureDetailDialog.html',
                clickOutsideToClose: true,
				locals : {
                    feature : feature,
					FeatureFactory : FeatureFactory,
                    ClientFactory : ClientFactory,
                    ProductFactory : ProductFactory,
                },
			});
		};
		
        
		$scope.showAdd = function(ev) {
			$mdDialog.show({
				controller: FeatureComposerController,
				templateUrl: 'FeatureComposerDialog.html',
                clickOutsideToClose: true,
				targetEvent: ev,
				locals : {
					FeatureFactory : FeatureFactory,
                    ClientFactory : ClientFactory,
                    ProductFactory : ProductFactory,
                },
			}).then(function(returnedData){
              
              $scope.features = FeatureFactory.getAll();
            });
		};
	}]);
	
	function FeatureComposerController($scope, $mdDialog, FeatureFactory, ClientFactory, ProductFactory) {
		
       $scope.clients = ClientFactory.getAll();
            
        
        $scope.$watchGroup(['client', 'clientPriority'], function(newValues, oldValues, scope) {
          
          if (newValues[0] && newValues[1]){
            if (!(isNaN(newValues[1]))){
              
              var fts = FeatureFactory.getWith({'priority' : $scope.clientPriority, 'clientId' : newValues[0]._id}, function() {
                console.log(newValues[0]._id);
                var present = false;
                
                angular.forEach(fts, function(item) {
                present = true;
                });
              
               if(present){
                $scope.form.priority.warning = true;

              } else {
                $scope.form.priority.warning = false;
                
              }
              console.log(fts);
              });
              
            }
              
          } else {
            
            $scope.form.priority.warning = false;
          }
          
        });
            
        $scope.products =  ProductFactory.getAll();
        
           
		$scope.targetDate = new Date();
        
		$scope.cancel = function() {
          $mdDialog.cancel();
		};
        $scope.save = function() {
          
          var isDirty;
          
          if(!$scope.title){
            
            isDirty = true;
            $scope.form.title.$touched = true;
            $scope.form.title.$error.required = true;
          }
          if(!$scope.desription){
            
            isDirty = true;
            $scope.form.desription.$touched = true;
            $scope.form.desription.$error.required = true;
          }
          if(!$scope.client){
            
            isDirty = true;
            $scope.form.client.$touched = true;
            $scope.form.client.$error.required = true;
          }
          if(!$scope.clientPriority){
            
            isDirty = true;
            $scope.form.priority.$touched = true;
            $scope.form.priority.$error.required = true;
          }
          
          console.log("out ticket" + $scope.ticketURL);
          if(!$scope.ticketURL){
            isDirty = true;
            
            $scope.form.ticket.$touched = true;
            if($scope.form.ticket.$error.required){
              $scope.form.ticket.$error.required = true;
            } else if ($scope.form.ticket.$error.url){
              $scope.form.ticket.$error.url = true;
            }
           
          }
          
          if(!$scope.product){
            
            isDirty = true;
            $scope.form.product.$touched = true;
            $scope.form.product.$error.required = true;
          }
          
          
          if(!isDirty){
            //call post
            var reqest = {
              "title" : $scope.title,
              "desription" : $scope.desription,
              "clientId" :  $scope.client._id,
              "priority" :  $scope.clientPriority,
              "ticketURL" :  $scope.ticketURL,
              "productId" :  $scope.product._id,
              "targetDate" : $scope.targetDate
            }
           
            FeatureFactory.create(reqest, function(newFeature) {
              var present = false;
              angular.forEach(newFeature, function(item) {
                present = true;
                });
 
              if(present){
                 $mdDialog.hide(newFeature);
              } else {
                $mdDialog.show(
                  $mdDialog.alert()
                  .clickOutsideToClose(true)
                  .title('Error')
                  .textContent('Error creating new feature. Please try again.')
                  .ok('Got it!')
                );
              } 
            });
          } 
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	};
    
    function FeatureDetailController($scope, $mdDialog, feature, FeatureFactory, ClientFactory, ProductFactory) {
		$scope.feature = feature;
        ClientFactory.getWithId({"id" : feature.clientId}, function(clients){
          if(clients.length > 0){
            $scope.client = clients[0];
          }
        });
        ProductFactory.getWithId({"id" : feature.productId}, function(products){
          if(products.length > 0){
            $scope.product = products[0];
          }
        });
        
		$scope.close = function() {
          $mdDialog.cancel();
		};
        
	};
	
	






