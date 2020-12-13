module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    done: {
      type: Sequelize.BOOLEAN
    }    
  });

  Task.associate = function(models) {
    Task.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "users",
    })
  }

  return Task;
};