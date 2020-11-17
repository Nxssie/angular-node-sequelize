module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tasks', [{
      id: 1,
      title: "test",
      description: "Sample description for test task",
      done: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      title: "test2",
      description: "Sample description for test task 2 for dev purposes",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};