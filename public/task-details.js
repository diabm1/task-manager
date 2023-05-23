// Get the task ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

// Get references to elements
const taskTitleElement = document.getElementById("task-title");
const taskDescriptionElement = document.getElementById("task-description");
const taskDueDateElement = document.getElementById("task-due-date");
const editButton = document.getElementById("edit-button");
const deleteButton = document.getElementById("delete-button");
const taskContainer = document.getElementById("task-container");
const editForm = document.getElementById("edit-form");
const editTaskForm = document.getElementById("edit-task-form");
const editTaskTitleInput = document.getElementById("edit-task-title");
const editTaskDescriptionInput = document.getElementById(
  "edit-task-description"
);
const editTaskDueDateInput = document.getElementById("edit-task-due-date");
const cancelButton = document.getElementById("cancel-button");

// Define the base URL for API requests
const baseUrl = "http://localhost:3000";

// Check if taskId is not null
if (taskId) {
  // Fetch task details and render them on the page
  fetchTaskDetails(taskId);

  // Add event listener to the delete button
  deleteButton.addEventListener("click", () => {
    deleteTask(taskId);
  });
}

function fetchTaskDetails(taskId) {
  axios
    .get(`${baseUrl}/tasks/${taskId}`)
    .then((response) => {
      const task = response.data;
      console.log(task.due_date); // Log the due_date value here
      renderTaskDetails(task);
    })
    .catch((error) => {
      console.error("Error fetching task details:", error.message);
      const taskContainer = document.getElementById("task-container");
      if (taskContainer) {
        taskContainer.innerHTML =
          "<p>Error fetching task details. Please try again.</p>";
      }
    });
}

function renderTaskDetails(task) {
  taskTitleElement.textContent = task.title;
  taskDescriptionElement.textContent = task.description;
  if (task.due_date && task.due_date.trim() !== "") {
    const dueDate = new Date(task.due_date + 'T00:00:00Z');
    const formattedDueDate = dueDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC'
    });
    taskDueDateElement.textContent = `Due Date: ${formattedDueDate}`;
    editTaskDueDateInput.value = task.due_date;
  } else {
    taskDueDateElement.textContent = "Due Date: Not specified";
    editTaskDueDateInput.value = "";
  }

  // Add event listener to the edit button
  editButton.addEventListener("click", () => {
    // Hide task details and show edit form
    taskContainer.style.display = "none";
    editForm.style.display = "block";

    // Pre-fill the form with the task details
    editTaskTitleInput.value = task.title;
    editTaskDescriptionInput.value = task.description;
    if (task.due_date && task.due_date.trim() !== "") {
      editTaskDueDateInput.value = task.due_date;
    } else {
      editTaskDueDateInput.value = "";
    }
  });

  // Add event listener to the cancel button
  cancelButton.addEventListener("click", () => {
    // Hide edit form and show task details
    taskContainer.style.display = "block";
    editForm.style.display = "none";
  });

  // Add event listener to the edit task form submission
  editTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedTask = {
      title: editTaskTitleInput.value,
      description: editTaskDescriptionInput.value,
      due_date: editTaskDueDateInput.value, // use due_date here
    };

    // Send the PUT request to update the task details
    updateTask(taskId, updatedTask);
  });
}

function updateTask(taskId, updatedTask) {
  axios
    .put(`${baseUrl}/tasks/${taskId}`, updatedTask)
    .then((response) => {
      const updatedTask = response.data;
      // Check if the due date was updated
      console.log(updatedTask.due_date);
      // Re-fetch and render the updated task details
      fetchTaskDetails(taskId);
      // Hide edit form and show task details
      taskContainer.style.display = "block";
      editForm.style.display = "none";
      console.log("Task details updated successfully");
    })
    .catch((error) => {
      console.error("Error updating task details:", error.message);
      const taskDetailsContainer = document.getElementById("task-container");
      if (taskDetailsContainer) {
        taskDetailsContainer.innerHTML =
          "<p>Error updating task details. Please try again.</p>";
      }
    });
}


function deleteTask(taskId) {
  axios
    .delete(`${baseUrl}/tasks/${taskId}`)
    .then(() => {
      // If successful, redirect to the main page
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error deleting task:", error.message);
      const taskContainer = document.getElementById("task-container");
      if (taskContainer) {
        taskContainer.innerHTML =
          "<p>Error deleting task. Please try again.</p>";
      }
    });
}
