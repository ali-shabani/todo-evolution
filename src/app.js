const containerTasks = document.getElementById("container_tasks");
const submitButton = document.getElementById("submit_task");
const tasks = [];
submitButton.addEventListener("click", () => {
  const taskInput = document.getElementById("task_input");
  const newTask = taskInput.value;
  tasks.push(newTask);
  taskInput.value = "";
  render(tasks);
});

function render(tasks) {
  containerTasks.innerHTML = "";
  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.textContent = task;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", onRemoveTask);

    taskElement.appendChild(removeButton);
    containerTasks.appendChild(taskElement);
  });
}

function onRemoveTask() {
  const taskElement = this.parentElement;
  const taskIndex = tasks.indexOf(taskElement);
  tasks.splice(taskIndex, 1);
  render(tasks);
}
