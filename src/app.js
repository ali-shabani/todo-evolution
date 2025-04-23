const containerTasks = document.getElementById("container_tasks");
const submitButton = document.getElementById("submit_task");
const taskInput = document.getElementById("task_input");
const errorText = document.getElementById("error_text");

const tasks = [];

function isTaskInputValid(taskText) {
  return taskText.trim().length > 0;
}

function addTask(taskText) {
  tasks.push(taskText);
  render(tasks);
}

function handleSubmitTask() {
  const newTask = taskInput.value;
  if (!isTaskInputValid(newTask)) {
    showError("input should not be empty!");
    return;
  }
  addTask(newTask);
  clear();
}

submitButton.addEventListener("click", handleSubmitTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSubmitTask();
  }
});

function showError(errorMessage) {
  errorText.textContent = errorMessage;
}
function clear() {
  showError("");
  clearInput();
}
function clearInput() {
  taskInput.value = "";
}

function render(tasks) {
  containerTasks.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.textContent = task;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.dataset.index = index;
    removeButton.addEventListener("click", handleRemoveTask);

    taskElement.appendChild(removeButton);
    containerTasks.appendChild(taskElement);
  });
}

function handleRemoveTask() {
  const taskIndex = parseInt(this.dataset.index);
  const taskToRemove = tasks[taskIndex];

  if (confirm(`Are you sure you want to remove the task: "${taskToRemove}"?`)) {
    tasks.splice(taskIndex, 1);
    render(tasks);
  }
}
