'use strict';
var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var card = [];

    for (var i = 0; i < 1; i++) {
      card.push({
        title: faker.lorem.words(),
        priority: 'Low',
        status: 'Queue',
        createdBy: faker.internet.userName(),
        assignedTo: faker.internet.userName(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
      });
    }
    console.log(card.length);
    return queryInterface.bulkInsert('cards', card, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cards', null, {});
  }
};
