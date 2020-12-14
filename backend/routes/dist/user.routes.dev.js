"use strict";

module.exports = function (app) {
  var users = require("../controllers/user.controller.js");

  var auth = require("../controllers/auth.js");

  var router = require("express").Router(); // Create a new User


  router.post("/", users.create); // Retrieve all User

  router.get("/", users.findAll); // Retrieve a single User with id

  router.get("/:id", users.findOne); // Update a User with id

  router.put("/:id", auth.isAuthenticated, users.update); // Sign in

  router.post("/signin", auth.signin); // Delete a User with id
  //router.delete("/:id", users.delete);

  app.use('/api/users', router);
};