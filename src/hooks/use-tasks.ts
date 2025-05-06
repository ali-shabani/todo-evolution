import { useMemo, useOptimistic } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addTask, deleteTask, getTasks } from "../api/api";
import { Task } from "@/models/task";

const taskQuery = {
  queryKey: ["tasks"],
};

export function useTasks() {
  const [filterQuery, setFilterQuery] = useState<string>("");

  const { data, isLoading, isError } = useQuery({
    ...taskQuery,
    queryFn: () => getTasks(),
  });

  const tasks = useMemo(() => {
    return data?.filter(
      (task) =>
        task.title.toLowerCase().includes(filterQuery.toLowerCase()) ?? []
    );
  }, [data, filterQuery]);

  return {
    setFilterQuery,
    tasks,
    isLoading,
    isError,
    filterQuery,
  };
}

export function useAddTask() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addTask,
    onMutate: async (task: Task) => {
      await queryClient.cancelQueries({ ...taskQuery });
      const previousTasks = queryClient.getQueryData<Task[]>(
        taskQuery.queryKey
      );
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks) => {
        //Todo i dont how to handle this yet and im not sure if this will cause a bug ! :D
        if (!oldTasks) {
          return [task];
        }
        //check if task is in optimistic cache
        const reSyncedTask = oldTasks?.find((t) => t.id === task.id);
        if (reSyncedTask) {
          reSyncedTask.syncStatus = "pending";
          return [...oldTasks];
        }
        return [...oldTasks, task];
      });
      return { previousTasks };
    },
    onError: (error, task, context) => {
      // queryClient.setQueryData(["tasks"], context?.previousTasks);
      task.syncStatus = "error";
    },
    onSuccess: (task) => {
      task.syncStatus = "synced";
    },
    onSettled: (_, __, task) => {
      if (task.syncStatus === "synced") {
        console.log("invalidating tasks");
        queryClient.invalidateQueries({ ...taskQuery });
      }
    },
  });
  return { mutate };
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ ...taskQuery });
    },
  });
  return { mutate };
}
