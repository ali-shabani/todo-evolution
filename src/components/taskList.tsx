import { Task } from "@/models/task";
import { TaskListItem } from "./task-list-item";

interface TaskListProps {
  tasks: Task[];
  onDelete?: (id: string) => void;
  onResync: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onResync,
}: TaskListProps) => {
  return tasks.length > 0 ? (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onResync={onResync}
        />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-full mt-10">
      <p className="text-muted-foreground">No tasks found!</p>
    </div>
  );
};
