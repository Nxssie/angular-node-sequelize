"use strict";

var db = require("../models");

var Task = db.task; // Create and Save a new Task

exports.create = function (req, res) {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } // Create a Task


  var task = {
    title: req.body.title,
    description: req.body.description,
    done: req.body.done
  }; // Save Car in the database

  Task.create(task).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the task."
    });
  });
}; // Retrieve all Task


exports.findAll = function (req, res) {
  console.log("its working.");
  Task.findAll().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks."
    });
  });
}; // Find a single task with an id


exports.findOne = function (req, res) {
  var id = req.params.id;
  Task.findByPk(id).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: "Error retrieving task with id=" + id
    });
  });
}; // Retrieve all tasks from an user


exports.findAllByUserId = function (req, res) {
  var id = req.params.id;
  Task.findAll({
    where: {
      userId: id
    }
  }).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks."
    });
  });
}; // Update a task by the id in the request


exports.update = function (req, res) {
  var id = req.params.id;
  Task.update(req.body, {
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: "Task was updated successfully."
      });
    } else {
      res.send({
        message: "Cannot update task with id=".concat(id, ". Maybe task was not found or req.body is empty!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: "Error updating Box with id=" + id
    });
  });
}; // Delete a task with the specified id in the request


exports["delete"] = function (req, res) {
  var id = req.params.id;
  Task.destroy({
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: "Task was deleted successfully!"
      });
    } else {
      res.send({
        message: "Cannot delete task with id=".concat(id, ". Maybe task was not found!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: "Could not delete task with id=" + id
    });
  });
}; // Delete all tasks from the database.


exports.deleteAll = function (req, res) {
  Task.destroy({
    where: {},
    truncate: false
  }).then(function (nums) {
    res.send({
      message: "".concat(nums, " tasks were deleted successfully!")
    });
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all tasks."
    });
  });
};