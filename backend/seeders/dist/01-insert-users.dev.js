"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      username: "admin",
      password: "1234",
      name: "Admin",
      isAdmin: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      username: "user",
      password: "1234",
      name: "User",
      isAdmin: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};