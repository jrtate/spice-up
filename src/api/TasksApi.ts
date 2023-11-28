import axios from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Task } from "../models/Task";

const BASE_URL = "/tasks";

export const useGetTasksQuery = () =>
  useQuery<Task[], null>({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}`,
      );
      return response.data;
    },
  });

export const useAddTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (task: Task) =>
      axios.post(`${process.env.REACT_APP_BASE_URL}${BASE_URL}`, task),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useEditTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (task: Task) =>
      axios.put(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}/${task.id}`,
        task,
      ),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useDeleteTaskMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${process.env.REACT_APP_BASE_URL}${BASE_URL}/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
