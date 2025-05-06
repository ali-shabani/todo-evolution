import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Trash,
  Check,
  Cloud,
  AlertCircle,
  CloudAlert,
} from "lucide-react";
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
import { Task } from "@/models/task";

interface TaskItemProps {
  task: Task;
  onDelete?: (id: string) => void;
  onResync: (task: Task) => void;
  onUpdate: (task: Task) => void;
}

export const TaskListItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onResync,
  onUpdate,
}) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id={task.id}
            checked={task.completed}
            className="h-5 w-5 rounded-full"
            onCheckedChange={(checked) => {
              onUpdate({ ...task, completed: checked === true });
            }}
          />
          <span
            className={`${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </span>
          {task.syncStatus === "pending" ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : task.syncStatus === "error" ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={() => onResync(task)}
            >
              <CloudAlert className="h-4 w-4" />
            </Button>
          ) : (
            <Check className="h-4 w-4 text-muted-foreground" />
          )}
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
  );
};
