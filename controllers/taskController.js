// create an array to store the tasks (for demonstration purposes)
const tasks = [
  { id: 1, title: "Task 1", description: "Task 1 description" },
  { id: 2, title: "Task 2", description: "Task 2 description" },
  { id: 3, title: "Task 3", description: "Task 3 description" },
];
module.exports = {
  // function to retrieve tasks
  getTasks: (req, res) => {
    try {
      // retrieve the tasks from the server or database
      res.send(tasks);
    } catch (error) {
      // handle any errors that occurred during task retrieval
      res.status(500).send("Error retrieving tasks");
    }
  },

  // function to create a new task
  createTask: (req, res) => {
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
  },

  // function to fetch tasks from the server
  fetchTasks: async (req, res) => {
    try {
      // the logic to fetch tasks from the server
      const response = await fetch("http://localhost:3000/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      // parse the response data as JSON
      const tasks = await response.json();

      // process the tasks and generate the task list HTML
      const taskListHTML = tasks
        .map((task) => {
          return `<li>${task.title}</li>`;
        })
        .join("");

      // send the task list HTML as the response
      return taskListHTML;
    } catch (error) {
      throw new Error("Error fetching tasks: " + error.message);
    }
  },
};
