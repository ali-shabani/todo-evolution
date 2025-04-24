import { useState } from "react";
import React from "react";
import "./app.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function isTaskInputValid(taskText) {
    return taskText.trim().length > 0;
  }

  function handleSubmitTask(event) {
    event.preventDefault();
    const newTask = event.target.taskInput.value;

    if (!isTaskInputValid(newTask)) {
      setErrorMessage("input should not be empty!");
      return;
    }

    setTasks([...tasks, newTask]);
    setErrorMessage("");
    event.target.taskInput.value = "";
  }

  function handleRemoveTask(index) {
    const taskToRemove = tasks[index];
    if (
      confirm(`Are you sure you want to remove the task: "${taskToRemove}"?`)
    ) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  }

  return (
    <div id="container_tasks">
      <form onSubmit={handleSubmitTask}>
        <input id="task_input" name="taskInput" type="text" />
        <button type="submit" id="submit_task">
          Add Task
        </button>
      </form>
      <div id="error_text">{errorMessage}</div>
      {tasks.map((task, index) => (
        <div key={index}>
          {task}
          <button onClick={() => handleRemoveTask(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default App;
