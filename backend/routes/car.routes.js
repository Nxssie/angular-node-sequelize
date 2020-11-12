module.exports = app => {
  const cars = require("../controllers/car.controller");

  var router = require("express").Router();

  // Create a new Box
  router.post("/", cars.create);

  // Retrieve all Box
  router.get("/", cars.findAll);

  // // Retrieve a single Box with id
  // router.get("/:id", cars.findOne);

  // // Update a Box with id
  // router.put("/:id", cars.update);

  // // Delete a Box with id
  // router.delete("/:id", cars.delete);

  // // Create a new Box
  // router.delete("/", cars.deleteAll);

  app.use('/api/cars', router);
};