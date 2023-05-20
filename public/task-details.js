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
  // fetch task details and render them on the page
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
      // handle error and display appropriate message on the page
      const taskContainer = document.getElementById("task-container");
      if (taskContainer) {
        taskContainer.innerHTML =
          "<p>Error fetching task details. Please try again.</p>";
      }
    });
}

function renderTaskDetails(task) {
  const taskContainer = document.getElementById("task-container");
  const editButton = document.getElementById("edit-button");
  const deleteButton = document.getElementById("delete-button");
  const editForm = document.getElementById("edit-form");

  if (taskContainer) {
    // clear previous contents
    taskContainer.innerHTML = "";

    // create elements to display task details
    const titleElement = document.createElement("h2");
    titleElement.textContent = task.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = task.description;

    const dueDateElement = document.createElement("p");
    dueDateElement.textContent = `Due Date: ${task.dueDate}`;

    // append elements to the task details container
    taskContainer.appendChild(titleElement);
    taskContainer.appendChild(descriptionElement);
    taskContainer.appendChild(dueDateElement);

    // add event listener to the edit button
    editButton.addEventListener("click", () => {
      // hide task details and show edit form
      taskContainer.style.display = "none";
      editForm.style.display = "block";

      // pre-fill the form with the task details
      editTaskTitleInput.value = task.title;
      editTaskDescriptionInput.value = task.description;
      editTaskDueDateInput.value = task.dueDate;
    });

    // add event listener to the cancel button
    cancelButton.addEventListener("click", () => {
      // hide edit form and show task details
      taskContainer.style.display = "block";
      editForm.style.display = "none";
    });

    // add event listener to the edit task form submission
    editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const updatedTask = {
        title: editTaskTitleInput.value,
        description: editTaskDescriptionInput.value,
        dueDate: editTaskDueDateInput.value,
      };

      // send the PUT request to update the task details
      fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error updating task details");
          }
          return response.json();
        })
        .then((updatedTask) => {
          // update the task details on the front end
          task.title = updatedTask.title;
          task.description = updatedTask.description;
          task.dueDate = updatedTask.dueDate;

          // re-render the updated task details
          renderTaskDetails(task);

          // hide edit form and show task details
          taskContainer.style.display = "block";
          editForm.style.display = "none";

          // show success message or perform any other action
          console.log("Task details updated successfully");
        })
        .catch((error) => {
          console.error("Error:", error.message);
          // handle error and display appropriate message on the page
          const taskDetailsContainer = document.getElementById("task-container");
          if (taskDetailsContainer) {
            taskDetailsContainer.innerHTML =
              "<p>Error updating task details. Please try again.</p>";
          }
        });
    });
  }
}
