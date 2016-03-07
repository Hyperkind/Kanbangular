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

      getCardById: function(cardId) {
        return $http.get(
          '/api/cards/' + cardId
        );
      },

      editCard: function(data, cardId) {
        return $http.put(
          '/api/cards/' + cardId,
          data
        )
        .then(function(res) {
          return res.data;
        });
      },

      delCards: function(cardId) {
        console.log('delete card:', cardId);
        return $http.delete(
          '/api/cards/' + cardId
        );
      },

      createCard: function() {
        return $http.post(
          '/'
        );
      }


    };
  }
]);