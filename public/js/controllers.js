var myApp = angular.module('myApp');

myApp.controller('MyController', [
  '$scope',
  'Users',
  'Cards',
  function($scope, Users, Cards) {
    $scope.users = [];
    Users.getUsers().then(function(response) {
      $scope.users = response.data;
    });

    $scope.cards = [];
    Cards.getCards().then(function(response) {
      $scope.cards = response.data;
    });
  }
]);