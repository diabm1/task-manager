// import necessary dependencies
const express = require("express");
const bodyParser = require("body-parser");
const {
  getTasks,
  createTask,
  fetchTasks,
} = require("./controllers/taskController");

// create an instance of express
const app = express();

// use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// route handler for the root URL ("/")
app.get("/", async (req, res) => {
  try {
    // call the fetchTasks function to generate the task list HTML
    const taskListHTML = await fetchTasks();
    // render the task list HTML as the response
    res.send(taskListHTML);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).send("Error fetching tasks: " + error.message);
  }
});

// endpoint for retrieving tasks
app.get("/tasks", getTasks);

// route to handle the POST request for adding tasks
app.post("/tasks", createTask);

// route to handle GET request for tasks
app.get("/api/tasks", fetchTasks);

// start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
