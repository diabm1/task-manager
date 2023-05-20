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
        document.getElementById("edit-task-title").value = task.title;
        document.getElementById("edit-task-description").value = task.description;
        document.getElementById("edit-task-due-date").value = task.dueDate;
      });
  
      // add event listener to the cancel button
      const cancelButton = document.getElementById("cancel-button");
      cancelButton.addEventListener("click", () => {
        // hide edit form and show task details
        taskContainer.style.display = "block";
        editForm.style.display = "none";
      });
    }
}
