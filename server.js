const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const seedDatabase = require("./seed.js");
const {
  getTasks,
  createTask,
  getTaskById,
  deleteTask,
  updateTask,
} = require("./controllers/taskController");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/seed", async (req, res) => {
  try {
    await seedDatabase();

    res.send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

app.get("/", async (req, res) => {
  try {
    res.send("<h1>Welcome to Task Manager API</h1>");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error: " + error.message);
  }
});

// endpoints for tasks
app.get("/tasks", getTasks);
app.post("/tasks", createTask);
app.get("/tasks/:id", getTaskById);
app.put("/tasks/:id", updateTask);
app.delete("/tasks/:id", deleteTask);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
