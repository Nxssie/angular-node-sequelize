"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tasks', [{
      id: 1,
      title: "test",
      description: "Sample description for test task",
      done: true,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      title: "test2",
      description: "Sample description for test task 2 for dev purposes",
      done: false,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};