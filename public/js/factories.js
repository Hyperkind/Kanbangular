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