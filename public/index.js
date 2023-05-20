// Assuming tasks is an array containing all the tasks
const tasks = [];

// Get reference to the task form
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

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

  // Use the task obj as needed (e.g., send it to the server, update UI, etc.)
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

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteTask(task.id);
  });

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = task.description;

  const dueDateParagraph = document.createElement("p");
  dueDateParagraph.textContent = `Due Date: ${task.dueDate}`;

  taskItem.appendChild(taskLink);
  taskItem.appendChild(deleteButton);
  taskItem.appendChild(descriptionParagraph);
  taskItem.appendChild(dueDateParagraph);

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

// Function to delete a task
function deleteTask(taskId) {
  // Find the index of the task with the given ID
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    // Remove the task from the tasks array
    tasks.splice(taskIndex, 1);

    // Remove the task item from the task list
    const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
    if (taskItem) {
      taskItem.remove();
    }
  }
}
