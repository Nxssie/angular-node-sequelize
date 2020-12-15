"use strict";

module.exports = function (app) {
  var tasks = require("../controllers/task.controller");

  var auth = require("../controllers/auth");

  var router = require("express").Router(); // Create a new Task


  router.post("/", auth.isAuthenticated, tasks.create); // Retrieve all Task

  router.get("/", auth.isAuthenticated, tasks.findAll); // Retrieve all Task by user ID

  router.get("/user/:id", auth.isAuthenticated, tasks.findAllByUserId); // Retrieve a single Task with id

  router.get("/:id", auth.isAuthenticated, tasks.findOne); // Update a Task with id

  router.put("/:id", auth.isAuthenticated, tasks.update); // Delete a Task with id

  router["delete"]("/:id", auth.isAuthenticated, tasks["delete"]);
  app.use('/api/tasks', router);
};