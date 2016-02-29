var myApp = angular.module('myApp');

myApp.controller('MyController', [
  '$scope',
  'Users',
  function($scope, Users) {
    $scope.users = [];
    Users.getUsers().then(function(response) {
      $scope.users = response.data;
    });
  }
]);