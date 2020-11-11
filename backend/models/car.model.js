module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("car", {
    sold: {
      type: Sequelize.BOOLEAN
    }
  });

  return Car;
};