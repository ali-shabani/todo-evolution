import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDelete?: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
}: TaskListProps) => {
  return tasks.length > 0 ? (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="shadow-sm">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id={task.id}
                checked={task.completed}
                className="h-5 w-5 rounded-full"
              />
              <span
                className={`${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.title}
              </span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this task?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete?.(task.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-full mt-10">
      <p className="text-muted-foreground">No tasks found!</p>
    </div>
  );
};
