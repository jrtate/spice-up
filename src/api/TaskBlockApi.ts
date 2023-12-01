import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TaskBlock } from "../models/Task";

const BASE_URL = "/task-block";

export const useGetTaskBlocksQuery = () =>
  useQuery<TaskBlock[], null>({
    queryKey: ["taskBlocks"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}`,
      );
      return response.data;
    },
  });

export const useUpdateTaskBlockMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (taskBlock: TaskBlock) =>
      axios.put(`${process.env.REACT_APP_BASE_URL}${BASE_URL}`, taskBlock),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["taskBlocks"] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
