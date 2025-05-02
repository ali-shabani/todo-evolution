//Mock API
//TODO: Refactor this stupuid shit type imports
import { Task } from "@/models/task";

let tasks: Task[] = [
  {
    id: "1",
    title: "Complete project documentation",
    completed: false,
    syncStatus: "synced",
  },
  {
    id: "2",
    title: "Review pull requests",
    completed: true,
    syncStatus: "synced",
  },
  {
    id: "3",
    title: "Update dependencies",
    completed: false,
    syncStatus: "synced",
  },
  {
    id: "4",
    title: "Write unit tests",
    completed: false,
    syncStatus: "synced",
  },
  {
    id: "5",
    title: "Deploy to production",
    completed: false,
    syncStatus: "synced",
  },
];
let shoudErrorCount = 1;
export function getTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("tasks fetched", tasks);
      resolve([...tasks]);
    }, 1000);
  });
}

export function addTask(task: Task): Promise<Task> {
  if (task.title === "salam" && shoudErrorCount > 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        shoudErrorCount--;
        reject(new Error("Task title cannot be 'salam'"));
      }, 1000);
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks.push(task);
      console.log("tasks updated", tasks);
      resolve(task);
    }, 1000);
  });
}

export function deleteTask(id: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.filter((task) => task.id !== id);
      resolve(id);
    }, 1000);
  });
}
