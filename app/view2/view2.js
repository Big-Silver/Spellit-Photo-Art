'use strict';

angular.module('myApp.view2', ['ngRoute', 'ang-drag-drop', 'dndLists', '720kb.socialshare'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', 'Socialshare', function($scope, $http, Socialshare) {
  $scope.spellArray1 = ["A", "B", "C", "D", "E", "F", "H", "I", "G", "K", "L", "M"];
  $scope.spellArray2 = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
  $scope.spellImgArray = [];

  $scope.models = {
      selected: null,
      templates: [],
      dropzones: {
          "List1": []
      }
  };

  $scope.$watch('models.dropzones', function(model) {
    $scope.modelAsJson = angular.toJson(model, true);
  }, true);

  $scope.updateImg = function(spell) {
    $http({
      method: 'GET',
      url: 'view2/img'
    }).then(function successCallback(response) {

        // RESPONSE CONTAINS YOUR FILE LIST
        console.log("Success");
        var temp = response.data;
        searchImage(temp);

      }, function errorCallback(response) {

        // ERROR CASE
        console.log("Error");
      });
  }

  var searchImage = function(item) {
    for(var i = 0; i < item.length; i++) {
      if(item[i] == '/' && item[i + 1] == 'a' && item[i + 2] == '>') {
        var temp = "view2/img/";
        for(var j = i - 1; j > 0; j--) {
          if(item[j] == '>') {
            for(var z = j + 1; z < i - 1; z++) {
              temp += item[z];
            }
            $scope.spellImgArray.push(temp);
            break;
          }
        }
      }
    }   
    $scope.spellImgArray.shift();
    $scope.spellImgArray.pop();

    for(var num = 0; num < $scope.spellImgArray.length; num++) {
      var temp_template = {type: "image", id: num + 1, url: $scope.spellImgArray[num]};
      $scope.models.templates.push(temp_template);
    }
  }

  $scope.setSpellImgBoard = function(setSpellImgBoard) {    
    var temp_spellWidth = 200 * setSpellImgBoard.length + 'px';
    return {
      'height': '350px',
      'width': temp_spellWidth      
    }
  }

  $scope.addWord = function() {
    var dropzone_num = 0;
    angular.forEach($scope.models.dropzones, function(value, key){
      dropzone_num++;
    })
    var temp_dropzone = "List" + (dropzone_num + 1);
    $scope.models.dropzones[temp_dropzone] = [];
  }

  $scope.removeWord = function(selected) {
    angular.forEach($scope.models.dropzones, function(value, key){
      if(selected == value) {
        delete $scope.models.dropzones[key];
      }        
    })
  }
}]);