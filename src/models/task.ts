export interface Task {
  id: string;
  title: string;
  completed: boolean;
  syncStatus: TaskSyncStatus;
}

export type TaskSyncStatus = "off" | "pending" | "synced" | "error";
