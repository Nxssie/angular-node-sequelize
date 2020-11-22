module.exports = app => {
  const tasks = require("../controllers/task.controller");

  var router = require("express").Router();

  // Create a new Task
  router.post("/", tasks.create);

  // Retrieve all Task
  router.get("/", tasks.findAll);

  // Retrieve all Task
  router.get("/tasks/:id", tasks.findAllByUserId);

  // Retrieve a single Task with id
  router.get("/:id", tasks.findOne);

  // // Update a Task with id
  router.put("/:id", tasks.update);

  // // Delete a Task with id
  router.delete("/:id", tasks.delete);

  // // Create a new Tasks
  router.delete("/", tasks.deleteAll);

  app.use('/api/tasks', router);
};