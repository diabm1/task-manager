require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

// Create a new Sequelize instance
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
      const tasks = await sequelize.query("SELECT * FROM tasks", {
        type: sequelize.QueryTypes.SELECT,
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
      console.log("Creating/updating task with:", title, description, dueDate);
      const query =
        "INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?) RETURNING *";
      const values = [title, description, dueDate];
      const [results] = await sequelize.query(query, { replacements: values });
      const newTask = results[0];
      res.status(201).send(newTask);
    } catch (error) {
      console.error("Error creating task:", error.message);
      res.status(500).send("Error creating task");
    }
  },

  getTaskById: async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const query = "SELECT * FROM tasks WHERE id = ?";
      const values = [taskId];
      const [results] = await sequelize.query(query, { replacements: values });
      const task = results[0];
      if (!task) {
        res.status(404).send("Task not found");
      } else {
        console.log(task.dueDate); // Log the dueDate value here
        res.send(task);
      }
    } catch (error) {
      console.error("Error retrieving task:", error.message);
      res.status(500).send("Error retrieving task");
    }
  },

  updateTask: async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const { title, description, due_date } = req.body; // Change dueDate to due_date
      console.log("Received update request with body:", req.body);

      let query;
      let values;

      if (due_date !== undefined) {
        // Change dueDate to due_date
        query =
          "UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ? RETURNING *";
        values = [title, description, due_date, taskId]; // Change dueDate to due_date
      } else {
        query =
          "UPDATE tasks SET title = ?, description = ? WHERE id = ? RETURNING *";
        values = [title, description, taskId];
      }

      const [results] = await sequelize.query(query, { replacements: values });
      const updatedTask = results[0];
      if (!updatedTask) {
        res.status(404).send("Task not found");
      } else {
        res.send(updatedTask);
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      res.status(500).send("Error updating task");
    }
  },

  deleteTask: async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const query = "DELETE FROM tasks WHERE id = ? RETURNING *";
      const values = [taskId];
      const [results] = await sequelize.query(query, { replacements: values });
      const deletedTask = results[0];
      if (!deletedTask) {
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
