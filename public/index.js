// get reference to the task form
const taskForm = document.getElementById("taskForm");

// add event listener for form submission
taskForm.addEventListener("submit", function (e) {
  e.preventDefault(); // prevents default form submission

  // get the task details from the form fields
  const taskTitleInput = document.getElementById("taskTitle");
  const taskDescriptionInput = document.getElementById("taskDescription");
  const taskDueDateInput = document.getElementById("taskDueDate");

  const taskTitle = taskTitleInput.value;
  const taskDescription = taskTitleInput.value;
  const taskDueDate = taskTitleInput.value;

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
