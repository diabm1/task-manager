// import necessary dependencies
const express = require("express");
const bodyParser = require("body-parser");

// create an instance of express
const app = express();

// use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// create an array to store the tasks (for demonstration purposes)
const tasks = [
  { id: 1, title: "Task 1", description: "Task 1 description" },
  { id: 2, title: "Task 2", description: "Task 2 description" },
  { id: 3, title: "Task 3", description: "Task 3 description" },
];

// route handler for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager");
});

// endpoint for retrieving tasks
app.get("/tasks", (req, res) => {
  try {
    // retrieve the tasks from the server or database
    res.send(tasks);
  } catch (error) {
    // handle any errors that occurred during task retrieval
    res.status(500).send("Error retrieving tasks");
  }
});

// define a route to handle the POST request for adding tasks
app.post("/tasks", (req, res) => {
  try {
    // get the task details from the request body
    const { title, description, dueDate } = req.body;

    // create a new task object
    const newTask = {
      id: tasks.length + 1, // generates a unique ID (need to use a database later on)
      title,
      description,
      dueDate,
    };

    // store the new task in the tasks array
    tasks.push(newTask);

    // send a response indicating successful task creation
    res.status(201).send(newTask);
  } catch (error) {
    // handle any errors that occurred during task creation
    res.status(500).send("Error creating task");
  }
});

// start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
