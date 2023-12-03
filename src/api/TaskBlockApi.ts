import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { TaskBlock } from "../models/Task";
import api from "./Api";

const BASE_URL = "/task-block";

export const useGetTaskBlocksQuery = () =>
  useQuery<TaskBlock[], null>({
    queryKey: ["taskBlocks"],
    queryFn: async () => {
      const response = await api.get(`${BASE_URL}`);
      return response.data;
    },
  });

export const useUpdateTaskBlockMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (taskBlock: TaskBlock) => api.put(`${BASE_URL}`, taskBlock),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["taskBlocks"] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
