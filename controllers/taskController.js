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

// const tasks = [
//   { id: 1, title: "Task 1", description: "Task 1 description" },
//   { id: 2, title: "Task 2", description: "Task 2 description" },
//   { id: 3, title: "Task 3", description: "Task 3 description" },
// ];

module.exports = {
  getTasks: async (req, res) => {
    try {
      const tasks = await sequelize.query("SELECT * FROM tasks", {
        type: QueryTypes.SELECT,
      });
      res.send(tasks);
    } catch (error) {
      console.error("Error retrieving tasks:", error.message);
      res.status(500).send("Error retrieving tasks");
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, description, dueDate } = req.body;

      const newTask = await sequelize.query(
        "INSERT INTO tasks (title, description, due_date) VALUES (:title, :description, :dueDate) RETURNING *",
        {
          type: QueryTypes.INSERT,
          replacements: { title, description, dueDate },
          model: Task,
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
      const task = await sequelize.query(
        "SELECT * FROM tasks WHERE id = :taskId",
        {
          type: QueryTypes.SELECT,
          replacements: { taskId },
          model: Task,
        }
      );

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

      const updatedTask = await sequelize.query(
        "UPDATE tasks SET title = :title, description = :description, due_date = :dueDate WHERE id = :taskId RETURNING *",
        {
          type: QueryTypes.UPDATE,
          replacements: { title, description, dueDate, taskId },
          model: Task,
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

      const deletedTask = await sequelize.query(
        "DELETE FROM tasks WHERE id = :taskId RETURNING *",
        {
          type: QueryTypes.DELETE,
          replacements: { taskId },
          model: Task,
        }
      );

      if (!deletedTask || deletedTask.length === 0) {
        res.status(404).send("Task not found");
      } else {
        res.send(deletedTask[0]);
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
      res.status(500).send("Error deleting task");
    }
  },
};
