const tasks = [
  { id: 1, title: "Task 1", description: "Task 1 description" },
  { id: 2, title: "Task 2", description: "Task 2 description" },
  { id: 3, title: "Task 3", description: "Task 3 description" },
];

module.exports = {
  getTasks: (req, res) => {
    try {
      res.send(tasks);
    } catch (error) {
      res.status(500).send("Error retrieving tasks");
    }
  },

  createTask: (req, res) => {
    try {
      const { title, description, dueDate } = req.body;

      const newTask = {
        id: tasks.length + 1,
        title,
        description,
        dueDate,
      };

      tasks.push(newTask);
      res.status(201).send(newTask);
    } catch (error) {
      res.status(500).send("Error creating task");
    }
  },

  getTaskById: (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const task = tasks.find((task) => task.id === taskId);

      if (!task) {
        res.status(404).send("Task not found");
      } else {
        res.send(task);
      }
    } catch (error) {
      console.error("Error retrieving task:", error.message);
      res.status(500).send("Error retrieving task");
    }
  },
  updateTask: (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const taskIndex = tasks.findIndex((task) => task.id === taskId);

      if (taskIndex === -1) {
        res.status(404).send("Task not found");
        return;
      }

      const { title, description, dueDate } = req.body;

      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description: description || tasks[taskIndex].description,
        dueDate: dueDate || tasks[taskIndex].dueDate,
      };

      res.send(tasks[taskIndex]);
    } catch (error) {
      console.error("Error updating task:", error.message);
      res.status(500).send("Error updating task");
    }
  },

  deleteTask: (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const taskIndex = tasks.findIndex((task) => task.id === taskId);

      if (taskIndex === -1) {
        res.status(404).send("Task not found");
        return;
      }

      const deletedTask = tasks.splice(taskIndex, 1);
      res.send(deletedTask[0]);
    } catch (error) {
      console.error("Error deleting task:", error.message);
      res.status(500).send("Error deleting task");
    }
  },
};
