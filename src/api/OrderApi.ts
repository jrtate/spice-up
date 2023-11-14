import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { TaskOrder } from "../models/task";
import axios from "axios";

export const useGetTaskOrdersQuery = () =>
  useQuery<TaskOrder[], null>({
    queryKey: ["taskOrders"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/order");
      return response.data;
    },
  });

export const useUpdateTaskSortOrderMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (taskOrder: TaskOrder[]) =>
      axios.put(`http://localhost:5000/order`, taskOrder),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["tasks", "taskOrders"] });
    },
  });
