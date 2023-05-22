require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getTasks: async (req, res) => {
    try {
      const [tasks] = await sequelize.query("SELECT * FROM tasks");
      res.send(tasks);
    } catch (error) {
      console.error("Error retrieving tasks:", error.message);
      res.status(500).send("Error retrieving tasks");
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, description, dueDate } = req.body;

      const [newTask] = await sequelize.query(
        "INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?) RETURNING *",
        {
          replacements: [title, description, dueDate],
        }
      );

      res.status(201).send(newTask[0]);
    } catch (error) {
      console.error("Error creating task:", error.message);
      res.status(500).send("Error creating task");
    }
  },

  getTaskById: async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const [task] = await sequelize.query("SELECT * FROM tasks WHERE id = ?", {
        replacements: [taskId],
      });

      if (!task || task.length === 0) {
        res.status(404).send("Task not found");
      } else {
        res.send(task[0]);
      }
    } catch (error) {
      console.error("Error retrieving task:", error.message);
      res.status(500).send("Error retrieving task");
    }
  },

  updateTask: async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const { title, description, dueDate } = req.body;

      const [updatedTask] = await sequelize.query(
        "UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ? RETURNING *",
        {
          replacements: [title, description, dueDate, taskId],
        }
      );

      if (!updatedTask || updatedTask.length === 0) {
        res.status(404).send("Task not found");
      } else {
        res.send(updatedTask[0]);
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      res.status(500).send("Error updating task");
    }
  },

  deleteTask: async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);

      const [deletedTask] = await sequelize.query(
        "DELETE FROM tasks WHERE id = ? RETURNING *",
        {
          replacements: [taskId],
        }
      );

      if (!deletedTask || deletedTask.length === 0) {
        res.status(404).send("Task not found");
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
      res.status(500).send("Error deleting task");
    }
  },
};
