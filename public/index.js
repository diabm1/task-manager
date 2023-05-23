const baseUrl = "http://localhost:3000";

// Get reference to the task form
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Fetch tasks from the server and render them on the page
function fetchTasks() {
  axios
    .get(`${baseUrl}/tasks`)
    .then((response) => {
      const tasks = response.data;
      renderTasks(tasks);
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error.message);
    });
}

// Render the tasks on the page
function renderTasks(tasks) {
  taskList.innerHTML = ""; // Clear the task list

  tasks.forEach((task) => {
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

    taskItem.appendChild(taskLink);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}

// Add event listener for form submission
taskForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  const taskTitleInput = document.getElementById("taskTitle");
  const taskDescriptionInput = document.getElementById("taskDescription");
  const taskDueDateInput = document.getElementById("taskDueDate");

  const taskTitle = taskTitleInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskDueDate = taskDueDateInput.value;

  const task = {
    title: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
  };

  axios
    .post(`${baseUrl}/tasks`, task)
    .then(() => {
      fetchTasks(); // Fetch the updated tasks and render them
      taskForm.reset(); // Reset form fields
    })
    .catch((error) => {
      console.error("Error creating task:", error.message);
    });
});

// Delete a task
function deleteTask(taskId) {
  axios
    .delete(`${baseUrl}/tasks/${taskId}`)
    .then((response) => {
      if (response.status === 204) {
        // Task deleted successfully
        fetchTasks(); // Fetch the updated tasks and render them
      } else {
        throw new Error("Error deleting task");
      }
    })
    .catch((error) => {
      console.error("Error deleting task:", error.message);
    });
}

// Fetch tasks when the page loads
fetchTasks();
