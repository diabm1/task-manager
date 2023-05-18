// get reference to the task form
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("task-list");

// add event listener for form submission
taskForm.addEventListener("submit", function (e) {
  e.preventDefault(); // prevents default form submission

  // get the task details from the form fields
  const taskTitleInput = document.getElementById("taskTitle");
  const taskDescriptionInput = document.getElementById("taskDescription");
  const taskDueDateInput = document.getElementById("taskDueDate");

  const taskTitle = taskTitleInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskDueDate = taskDueDateInput.value;

  // create a task object with the captured details
  const task = {
    title: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
  };

  // use the task obj as needed (e.g., send it to the server, Update UI, etc.)
  console.log(task);

  //reset form fields
  taskForm.reset();
});

// assuming tasks is an array containing all the tasks
const tasks = [];

// function to render a task item
function renderTask(task) {
  const taskList = document.getElementById("taskList");

  // create a new list item element
  const taskItem = document.createElement("li");

  // set the innerHTML of the list item with the task details
  taskItem.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Due Date: ${task.dueDate}</p>
    `;

  // append the list item to the task list
  taskList.appendChild(taskItem);
}

// example code for adding a new task
const newTask = {
  title: "New Task",
  description: "This is a new task",
  dueDate: "2022-12-31",
};

// add the new task to the tasks array
tasks.push(newTask);

// render the new task on the page
renderTask(newTask);
