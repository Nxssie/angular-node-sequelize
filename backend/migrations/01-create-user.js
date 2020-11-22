module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable("users", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("users"),
  }