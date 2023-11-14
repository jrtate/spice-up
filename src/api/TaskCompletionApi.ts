import { QueryClient, useMutation } from "@tanstack/react-query";
import { CompletedTask } from "../models/task";
import axios from "axios";

export const useCompleteTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (completedTask: CompletedTask) =>
      axios.post(
        `http://localhost:5000/task-completion/complete/${completedTask.id}`,
        completedTask,
      ),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

export const useUnCompleteTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) =>
      axios.delete(`http://localhost:5000/task-completion/uncomplete/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
