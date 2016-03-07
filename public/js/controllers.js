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

    $scope.newCard = function(title, priority, status, createdBy, assignedTo) {
      Cards.createCard({
        title: title,
        priority: priority,
        status: status,
        createdBy: createdBy,
        assignedTo: assignedTo
      });
    };

    // $scope.updateCard = function(priority, status) {
    //   Cards.updateCards({
    //     status: status,
    //     priority: priority
    //   });
    // };
  }
]);

myApp.controller('ViewController', [
  '$scope',
  'Cards',
  '$routeParams',
  function($scope, Cards, $routeParams) {
    $scope.cardId = $routeParams.cardId;

    Cards.getCardById($routeParams.cardId)
    .then(function(res) {
      $scope.card = res.data;
    });
  }
]);

myApp.controller('EditController', [
  '$scope',
  '$routeParams',
  'Cards',
  '$location',
  function($scope, $routeParams, Cards, $location) {
    $scope.cardId = $routeParams.cardId;
    console.log($routeParams.cardId);

    Cards.getCardById($routeParams.cardId)
    .then(function(res) {
      $scope.card = res.data;
    });

    console.log('$routeParams', $routeParams);
    $scope.editCard = function(event) {
      var data = {
        title: $scope.title,
        priority: $scope.priority,
        status: $scope.status,
        createdBy: $scope.createdBy,
        assignedTo: $scope.assignedTo
      };
      console.log('event', event);
      event.preventDefault();
      Cards.updateCard(data, $routeParams.cardId)
      .then(function(editCard) {
        $location.path('/#/kanban');
      });
    };

    $scope.delCard = function(cardId) {
      Cards.delCards(cardId)
      .then(function(delCard) {
        $location.path('/#/kanban');
      });
    };

  }
]);