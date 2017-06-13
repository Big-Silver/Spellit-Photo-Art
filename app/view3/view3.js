'use strict';

angular.module('myApp.view3', ['ngRoute', 'ang-drag-drop', 'dndLists', '720kb.socialshare'])

.config(['$routeProvider', 'socialshareConfProvider', function($routeProvider, socialshareConfProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope', '$http', 'Socialshare', function($scope, $http, Socialshare) {
  
}]);