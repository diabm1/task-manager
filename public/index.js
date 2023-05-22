// Assuming tasks is an array containing all the tasks
let tasks = [];

// Define the base URL for API requests
const baseUrl = "http://localhost:3000";

// Get reference to the task form
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Add event listener for form submission
taskForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  // Get the task details from the form fields
  const taskTitleInput = document.getElementById("taskTitle");
  const taskDescriptionInput = document.getElementById("taskDescription");
  const taskDueDateInput = document.getElementById("taskDueDate");

  const taskTitle = taskTitleInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskDueDate = taskDueDateInput.value;

  // Create a task object with the captured details
  const task = {
    title: taskTitle,
    description: taskDescription,
    dueDate: new Date(taskDueDate).toISOString().slice(0, 10),
};

  // Send a POST request to create a new task
  axios
    .post(`${baseUrl}/tasks`, task)
    .then((response) => {
      const newTask = response.data;
      tasks.push(newTask); // Add the new task to the tasks array
      renderTask(newTask); // Render the new task on the page
      taskForm.reset(); // Reset form fields
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
});

// Function to render a task item
function renderTask(task) {
  const taskItem = document.createElement("li");
  taskItem.setAttribute("data-task-id", task.id);

  const taskLink = document.createElement("a");
  taskLink.textContent = task.title;
  taskLink.href = `task-details.html?id=${task.id}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteTask(task.id);
  });

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = task.description;

  const dueDateParagraph = document.createElement("p");
  const dueDate = new Date(task.dueDate);
  if (!isNaN(dueDate)) {  // Check if the date is valid
    dueDateParagraph.textContent = `Due Date: ${new Date(task.dueDate).toLocaleDateString()}`;

  } else {
    dueDateParagraph.textContent = "Due Date: Invalid Date";
  }

  taskItem.appendChild(taskLink);
  taskItem.appendChild(deleteButton);
  taskItem.appendChild(descriptionParagraph);
  taskItem.appendChild(dueDateParagraph);

  taskList.appendChild(taskItem);
}

// Function to delete a task
function deleteTask(taskId) {
  // Send a DELETE request to the server
  axios
    .delete(`${baseUrl}/tasks/${taskId}`)
    .then((response) => {
      if (response.status === 204) {
        // Remove the task from the tasks array
        tasks = tasks.filter((task) => task.id !== taskId);

        // Remove the task item from the task list
        const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
        if (taskItem) {
          taskItem.remove();
        }
      } else {
        throw new Error("Error deleting task");
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
      // Display an error message on the page or perform any other error handling
    });
}
