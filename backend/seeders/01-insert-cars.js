module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cars', [{
      id: 1,
      sold: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      sold: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('boxes', null, {});
  }
};