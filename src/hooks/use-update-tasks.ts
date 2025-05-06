import { updateTask } from "@/api/api";
import { Task } from "@/models/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTask,
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
      queryClient.setQueryData(["tasks"], (old: Task[]) =>
        old.map((t) => (t.id === task.id ? task : t))
      );
      return { previousTasks };
    },
    onError: (error, task, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { mutate };
}
