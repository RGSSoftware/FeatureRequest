
angular.module('featuresModule',['FeatureListController', 'featureFactory']);
angular.module('clientModule', ['ClientFactory']);

angular.module('feature-request', ['featuresModule', 'clientModule']);
