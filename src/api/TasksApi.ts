import axios from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { CompletedTask, Task, TaskOrder } from "../models/task";
import * as querystring from "querystring";

export const useGetTasksQuery = () =>
  useQuery<Task[], null>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/tasks");
      return response.data;
    },
  });

export const useAddTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (task: Task) => axios.post(`http://localhost:5000/tasks`, task),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

export const useEditTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (task: Task) =>
      axios.put(`http://localhost:5000/tasks/${task.id}`, task),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

export const useDeleteTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) =>
      axios.delete(`http://localhost:5000/tasks/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
