const db = require("../models");
const Car = db.car;

// Create and Save a new Car
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Car
    const car = {
        id: req.body.id,
        sold: req.body.occupied
    };

    // Save Car in the database
    Car.create(car)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Car."
            });
        });
};

// Retrieve all cars
exports.findAll = (req, res) => {
  console.log("its working.");
  Car.findAll()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving boxes."
          });
      });
};