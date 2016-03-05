angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/welcome.html',
        controller: 'MyController'
      })
      .when('/newCard', {
        templateUrl: '/templates/newCard.html',
        controller: 'MyController'
      })
      .when('/kanban', {
        templateUrl: '/templates/kanban.html',
        controller: 'MyController'
      })
      .when('/viewCard/:id', {
        templateUrl: '/templates/viewCard.html',
        controller: 'ViewController'
      })
      .when('/404', {
        templateUrl: '/templates/404.html'
      })
      .otherwise('/404');
  })
  .run(function() {

  });