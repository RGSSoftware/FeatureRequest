
angular.module('featuresModule',['FeatureListController', 'featureFactory']);
angular.module('clientModule', ['ClientFactory']);
angular.module('productModule', ['ProductFactory']);

angular.module('feature-request', ['featuresModule', 'clientModule', 'productModule']);
