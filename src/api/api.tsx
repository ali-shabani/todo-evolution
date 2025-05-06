//Mock API
//TODO: Refactor type imports from models to be more explicit and avoid circular dependencies.
import { Task } from "@/models/task";

const LOG_PREFIX = "api";

type DisallowedTask = {
  title: string;
  count: number;
};

const DISALLOWED_TASKS: DisallowedTask[] = [{ title: "salam", count: 1 }];

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
      console.log(`${LOG_PREFIX} : tasks fetched.`, tasks);
      resolve([...tasks]);
    }, 1000);
  });
}

export function addTask(task: Task): Promise<Task> {
  const disallowedTask = DISALLOWED_TASKS.find(
    (t) => t.title === task.title && t.count > 0
  );
  if (disallowedTask) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        disallowedTask.count--;
        reject(new Error(`Task title '${task.title}' is disallowed`));
        console.log(
          `${LOG_PREFIX} : task rejected with error: Task title '${task.title}' is disallowed`
        );
      }, 1000);
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks.push(task);
      console.log(`${LOG_PREFIX} : tasks updated.`, tasks);
      resolve(task);
    }, 1000);
  });
}

export function deleteTask(id: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.filter((task) => task.id !== id);
      console.log(`${LOG_PREFIX} : task deleted.`, id);
      resolve(id);
    }, 1000);
  });
}

export function updateTask(task: Task): Promise<Task> {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.map((t) => (t.id === task.id ? task : t));
      console.log(`${LOG_PREFIX} : task updated.task id: ${task.id}`);
      resolve(task);
    }, 1000);
  });
}
