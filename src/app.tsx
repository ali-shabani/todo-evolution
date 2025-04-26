import { useState } from "react";
import React from "react";
import "./app.css";
import { TaskList } from "./components/taskList";

// Sample tasks data
const initialTasks = [
  { id: "1", title: "Complete project documentation", completed: false },
  { id: "2", title: "Review pull requests", completed: true },
  { id: "3", title: "Update dependencies", completed: false },
  { id: "4", title: "Write unit tests", completed: false },
  { id: "5", title: "Deploy to production", completed: false },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function isTaskInputValid(taskText: string): boolean {
    return taskText.trim().length > 0;
  }

  function handleSubmitTask(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newTask = (form.elements.namedItem("taskInput") as HTMLInputElement)
      .value;

    if (!isTaskInputValid(newTask)) {
      setErrorMessage("input should not be empty!");
      return;
    }

    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setErrorMessage("");
    form.reset();
  }

  function handleRemoveTask(id: string): void {
    const taskToRemove = tasks.find((task) => task.id === id);
    if (
      taskToRemove &&
      confirm(
        `Are you sure you want to remove the task: "${taskToRemove.title}"?`
      )
    ) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  }

  return (
    <div className="container mx-auto p-4" id="container_tasks">
      <form onSubmit={handleSubmitTask} className="mb-6">
        <input
          id="task_input"
          name="taskInput"
          type="text"
          className="border p-2 rounded-md mr-2"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          type="submit"
          id="submit_task"
        >
          Add Task
        </button>
      </form>
      {errorMessage && (
        <div id="error_text" className="text-red-500 font-bold mb-4">
          {errorMessage}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <TaskList tasks={tasks} onDelete={handleRemoveTask} />
    </div>
  );
}

export default App;
