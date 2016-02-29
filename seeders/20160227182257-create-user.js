'use strict';
var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var user = [];

    for (var i = 0; i < 1; i++) {
      user.push({
        username: faker.internet.userName(),
        password: '12345',
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
      });
    }
    console.log(user.length);
    return queryInterface.bulkInsert('users', user, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
