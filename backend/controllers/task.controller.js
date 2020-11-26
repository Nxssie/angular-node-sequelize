const db = require("../models");
const Task = db.task;

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Task
    const task = {
        title: req.body.title,
        description: req.body.description,
        done: req.body.done
    };

    // Save Task in the database
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the task."
            });
        });
};

// Retrieve all Task
exports.findAll = (req, res) => {
  console.log("its working.");
  Task.findAll()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving tasks."
          });
      });
};

// Find a single task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: "Error retrieving task with id=" + id
          });
      });
};

// Retrieve all tasks from an user
exports.findAllByUserId = (req, res) => {
    const id = req.params.id;

    Task.findAll({
        where: {userId: id}
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tasks."
        });
    });
}

// Update a task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
      where: {id: id}
  })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "Task was updated successfully."
              });
          } else {
              res.send({
                  message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error updating Box with id=" + id
          });
      });
};

// Delete a task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
      where: {id: id}
  })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "Task was deleted successfully!"
              });
          } else {
              res.send({
                  message: `Cannot delete task with id=${id}. Maybe task was not found!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Could not delete task with id=" + id
          });
      });
};

// Delete all tasks from the database.
exports.deleteAll = (req, res) => {
  Task.destroy({
      where: {},
      truncate: false
  })
      .then(nums => {
          res.send({message: `${nums} tasks were deleted successfully!`});
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while removing all tasks."
          });
      });
};