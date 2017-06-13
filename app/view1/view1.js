'use strict';

angular.module('myApp.view1', ['ngRoute', 'ang-drag-drop', 'dndLists', '720kb.socialshare'])

.config(['$routeProvider', 'socialshareConfProvider', function($routeProvider, socialshareConfProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.directive('styleParent', function(){ 
   return {
     restrict: 'A',
     link: function(scope, elem, attr) {
         elem.on('load', function() {
            var w = $(this).width();
            var div = elem.parent();                                        
            //check width and height and apply styling to parent here.
         });
     }
   };
})

.controller('View1Ctrl', ['$scope', '$http', 'Socialshare', function($scope, $http, Socialshare) {

  $scope.imgArray = [];

  var readfiles = function() {
    $http({
      method: 'GET',
      url: 'view1/img'
    }).then(function successCallback(response) {

        // RESPONSE CONTAINS YOUR FILE LIST
        console.log("Success");
        var temp = response.data;
        console.log(response);
        searchImage(temp);

      }, function errorCallback(response) {

        // ERROR CASE
        console.log("Error");

      });
  }
  var searchImage = function(item) {
    for(var i = 0; i < item.length; i++) {
      if(item[i] == '/' && item[i + 1] == 'a' && item[i + 2] == '>') {
        var temp = "view1/img/";
        for(var j = i - 1; j > 0; j--) {
          if(item[j] == '>') {
            for(var z = j + 1; z < i - 1; z++) {
              temp += item[z];
            }
            $scope.imgArray.push(temp);
            break;
          }
        }
      }
    }   
    $scope.imgArray.shift();
    $scope.imgArray.pop();
  }
  $scope.checkImg = function(url) {
    return true;
  }   
  
  $scope.nextMove = function() {
  }

  readfiles();  
}]);