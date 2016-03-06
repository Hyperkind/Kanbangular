var myApp = angular.module('myApp');

myApp.factory('Users', [
  '$http',
  function($http) {
    return {
      getUsers: function() {
        return $http({
          method: 'GET',
          url: '/api/users'
        });
      }
    };
  }
]);

myApp.factory('Cards', [
  '$http',
  function($http) {
    return {

      getCards: function() {
        return $http.get(
          '/api/cards/'
        );
      },

      delCards: function(cardId) {
        return $http.delete(
          '/api/cards/' + cardId
        );
      },

      updateCards: function(cardId) {
        return $http.put(
          '/api/cards/' + cardId
        );
      },

      createCard: function() {
        return $http.post(
          '/api/cards/:cardId'
        );
      }

    };
  }
]);