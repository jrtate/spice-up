import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Task } from "../models/Task";
import api from "./Api";

const BASE_URL = "/tasks";

export const useGetTasksQuery = () =>
  useQuery<Task[], null>({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await api.get(`${BASE_URL}`);
      return response.data;
    },
  });

export const useAddTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (task: Task) => api.post(`${BASE_URL}`, task),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useEditTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (task: Task) => api.put(`${BASE_URL}/${task.id}`, task),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useDeleteTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) => api.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
