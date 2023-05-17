// import necassary dependencies
const express = require("express");
const bodyParser = require("body-parser");

// create an instance of express
const app = express();

// use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// create an array to store the tasks (for demonstration purposes)
let tasks = [];

// define a route to handle the POST request for adding tasks
app.post("/tasks", (req, res) => {
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
  res.status(201).json(newTask);
});

// start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
