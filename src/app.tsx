import { useRef, useState } from "react";
import React from "react";
import "./app.css";
import { TaskList } from "./components/taskList";
import { Toaster } from "@/components/ui/sonner";
import { Task } from "@/models/task";
import { useTasks, useAddTask } from "./hooks/use-tasks";
// Sample tasks data

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const { tasks, isLoading, isError, setFilterQuery, filterQuery } = useTasks();
  const { mutate: addTask } = useAddTask();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [removedTask, setRemovedTask] = useState<Task | undefined>(undefined);

  function isTaskInputValid(taskText: string | undefined): taskText is string {
    if (!taskText) return false;
    return taskText.trim().length > 0;
  }
  function handleSubmitTask(formData: FormData): void {
    const newTask = formData.get("taskInput")?.valueOf() as string;

    if (!isTaskInputValid(newTask)) {
      setErrorMessage("input should not be empty!");
      return;
    }

    const newTaskObj: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      syncStatus: "pending",
    };
    addTask(newTaskObj);
    setErrorMessage("");
    // formRef.current?.reset();
  }

  function handleRemoveTask(id: string): void {
    // const taskToRemove = tasks.find((task) => task.id === id);
    // if (taskToRemove) {
    //   setRemovedTask(taskToRemove);
    //   //setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    //   toast.success("Task removed successfully", {
    //     action: {
    //       label: "Undo",
    //       onClick: () => {
    //         //setTasks((prevTasks) => [...prevTasks, taskToRemove]);
    //         setRemovedTask(undefined);
    //       },
    //     },
    //   });
    // }
  }

  function handleResyncTask(task: Task): void {
    addTask(task);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tasks</div>;
  if (!tasks) return <div>No tasks found</div>;
  return (
    <>
      <div className="container mx-auto p-4" id="container_tasks">
        <form action={handleSubmitTask} ref={formRef} className="mb-6">
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <div className="relative w-72">
            <label htmlFor="search_input" className="sr-only">
              Search tasks
            </label>
            <input
              id="search_input"
              type="search"
              placeholder="Search tasks..."
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setFilterQuery(e.target.value)}
              value={filterQuery}
            />
          </div>
        </div>
        <TaskList
          tasks={tasks}
          onDelete={handleRemoveTask}
          onResync={handleResyncTask}
        />
      </div>
      <Toaster />
    </>
  );
}

export default App;
