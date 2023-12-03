import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { TaskOrder } from "../models/Task";
import api from "./Api";

const BASE_URL = "/order";

export const useGetTaskOrdersQuery = () =>
  useQuery<TaskOrder[], null>({
    queryKey: ["taskOrders"],
    queryFn: async () => {
      const response = await api.get(`${BASE_URL}`);
      return response.data;
    },
  });

export const useUpdateTaskSortOrderMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (taskOrder: TaskOrder[]) => api.put(`${BASE_URL}`, taskOrder),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["taskOrders"] });
    },
  });
