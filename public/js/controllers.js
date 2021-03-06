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
  function($scope, $routeParams, Cards, $location, title, priority, status, createdBy, assignedTo) {
    Cards.getCardById($routeParams.cardId)
      .then(function(res) {
        $scope.card = res.data;
      });

    $scope.editCard = function(event) {
      event.preventDefault();
      var editData = {
        id: $scope.card.id,
        title: event.target.title.value,
        priority:   event.target.priority.value,
        status: event.target.status.value,
        createdBy: $scope.card.createdBy,
        assignedTo: event.target.assignedTo.value
      };
      console.log(editData);
      Cards.editCard(editData, $routeParams.cardId)
        .then(function() {
          $location.path('/dashboard');
        });
    };

    $scope.delCard = function(cardId) {
      console.log(cardId);
      Cards.delCards(cardId);
    };

  }
]);