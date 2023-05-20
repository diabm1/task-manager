//  an array containing all the tasks
const tasks = [];

// Get reference to the task form
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskDetailsContainer = document.getElementById("taskDetailsContainer");

// Add event listener for form submission
taskForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents default form submission

  // Get the task details from the form fields
  const taskTitleInput = document.getElementById("taskTitle");
  const taskDescriptionInput = document.getElementById("taskDescription");
  const taskDueDateInput = document.getElementById("taskDueDate");

  const taskTitle = taskTitleInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskDueDate = taskDueDateInput.value;

  // Create a task object with the captured details
  const task = {
    id: tasks.length + 1, // Generate unique ID
    title: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
  };

  // Use the task object as needed (e.g., send it to the server, update UI, etc.)
  console.log(task);

  // Add the new task to the tasks array
  tasks.push(task);

  // Render the new task on the page
  renderTask(task);

  // Reset form fields
  taskForm.reset();
});

// Function to render a task item
function renderTask(task) {
  const taskItem = document.createElement("li");
  const taskLink = document.createElement("a");
  taskLink.textContent = task.title;
  taskLink.href = `task-details.html?id=${task.id}`;

  taskItem.appendChild(taskLink);
  taskList.appendChild(taskItem);
}

// Example code for adding a new task
const newTask = {
  id: tasks.length + 1, // Generate unique ID
  title: "New Task",
  description: "This is a new task",
  dueDate: "2022-12-31",
};

// Add the new task to the tasks array
tasks.push(newTask);

// Render the new task on the page
renderTask(newTask);
