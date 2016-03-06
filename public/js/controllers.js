var myApp = angular.module('myApp');

myApp.controller('MyController', [
  '$scope',
  'Users',
  'Cards',
  function($scope, Users, Cards) {
    $scope.users = [];
    $scope.cards = [];

    Users.getUsers()
    .then(function(res) {
      $scope.users = res.data;
    });

    Cards.getCards()
    .then(function(res) {
      $scope.cards = res.data;
    });

    $scope.newCard = function(title, priority, createdBy, assignedTo) {
      Cards.createCard({
        title: title,
        priority: priority,
        createdBy: createdBy,
        assignedTo: assignedTo
      });
    };

    $scope.updateCard = function(card) {
      Cards.updateCards(card);
    };

    $scope.delCard = function(card) {
      Cards.delCards(card);
    };
  }
]);

myApp.controller('ViewController', [
  '$scope',
  'Cards',
  '$routeParams',
  function($scope, Cards, $routeParams) {
    $scope.cardId = $routeParams.id;
    // console.log($routeParams.id);

    $scope.cards = [];

    Cards.getCards().then(function(response) {
      $scope.cards = response.data;
    });
    // $scope.delCard = function() {
    //   console.log('del');
    // };
  }
]);