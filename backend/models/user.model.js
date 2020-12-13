module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      }
    });

    User.associate = function (models) {
      User.hasMany(models.task, {
        foreignKey: "userId",
        as: "tasks",
      });
    }
  
    return User;
  };