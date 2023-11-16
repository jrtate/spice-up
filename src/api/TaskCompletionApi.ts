import { QueryClient, useMutation } from "@tanstack/react-query";
import { CompletedTask } from "../models/task";
import axios from "axios";

const BASE_URL = "/task-completion";

export const useCompleteTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (completedTask: CompletedTask) =>
      axios.post(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}/complete/${completedTask.id}`,
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
      axios.delete(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}/uncomplete/${id}`,
      ),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
