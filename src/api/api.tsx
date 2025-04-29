//Mock API
//TODO: Refactor this stupuid shit type imports
import { Task } from "@/components/taskList";

const tasks: Task[] = [
  { id: "1", title: "Complete project documentation", completed: false },
  { id: "2", title: "Review pull requests", completed: true },
  { id: "3", title: "Update dependencies", completed: false },
  { id: "4", title: "Write unit tests", completed: false },
  { id: "5", title: "Deploy to production", completed: false },
];
function getTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks);
    }, 1000);
  });
}

function addTask(task: Task) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(task);
    }, 1000);
  });
}

function deleteTask(id: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 1000);
  });
}

export default { getTasks, addTask, deleteTask };
