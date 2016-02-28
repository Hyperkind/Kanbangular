var myApp = angular.module('myApp');
var db = require('./models');
var card = db.card;

myApp.service('Kanban', Kanban);

function Kanban() {

  this.getCards = function() {
    return card;
  };

  this.addCard = function(title, priority, createdBy, assignedTo) {
    var newCard = {
      title: title,
      priority: priority,
      createdBy: createdBy,
      assignedTo: assignedTo
    };
    card.push(newCard);
    console.log(newCard);
  };
}