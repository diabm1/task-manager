// Get the task ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

// Get references to elements
const taskTitleElement = document.getElementById("task-title");
const taskDescriptionElement = document.getElementById("task-description");
const taskDueDateElement = document.getElementById("task-due-date");
const editButton = document.getElementById("edit-button");
const deleteButton = document.getElementById("delete-button");
const editForm = document.getElementById("edit-form");
const editTaskForm = document.getElementById("edit-task-form");
const editTaskTitleInput = document.getElementById("edit-task-title");
const editTaskDescriptionInput = document.getElementById("edit-task-description");
const editTaskDueDateInput = document.getElementById("edit-task-due-date");
const cancelButton = document.getElementById("cancel-button");

// Check if taskId is not null
if (taskId) {
  // Fetch task details and render them on the page
  fetch(`http://localhost:3000/tasks/${taskId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching task details");
      }
      return response.json();
    })
    .then((task) => {
      renderTaskDetails(task);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      const taskDetailsContainer = document.getElementById("task-container");
      if (taskDetailsContainer) {
        taskDetailsContainer.innerHTML =
          "<p>Error fetching task details. Please try again.</p>";
      }
    });
}

function renderTaskDetails(task) {
  if (taskTitleElement) {
    taskTitleElement.textContent = task.title;
  }
  if (taskDescriptionElement) {
    taskDescriptionElement.textContent = task.description;
  }
  if (taskDueDateElement) {
    taskDueDateElement.textContent = `Due Date: ${task.dueDate}`;
  }

  // Show edit form when the Edit button is clicked
  if (editButton && editForm) {
    editButton.addEventListener("click", () => {
      editTaskTitleInput.value = task.title;
      editTaskDescriptionInput.value = task.description;
      editTaskDueDateInput.value = task.dueDate;
      editForm.style.display = "block";
      taskDetailsContainer.style.display = "none";
    });
  }

  // Handle form submission for saving changes
  if (editTaskForm) {
    editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const updatedTask = {
        title: editTaskTitleInput.value,
        description: editTaskDescriptionInput.value,
        dueDate: editTaskDueDateInput.value,
      };

      // Send PUT request to update the task on the server
      fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error updating task");
          }
          return response.json();
        })
        .then((task) => {
          // Update task details on the page
          renderTaskDetails(task);
          // Hide the edit form
          editForm.style.display = "none";
          taskDetailsContainer.style.display = "block";
        })
        .catch((error) => {
          console.error("Error:", error.message);
          // Display error message if update fails
          const editFormError = document.createElement("p");
          editFormError.textContent = "Error updating task. Please try again.";
          editTaskForm.appendChild(editFormError);
        });
    });
  }

  // Handle cancel button click to hide the edit form
  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      editForm.style.display = "none";
      taskDetailsContainer.style.display = "block";
    });
  }
}
