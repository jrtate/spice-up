import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { TaskOrder } from "../models/task";
import axios from "axios";

const BASE_URL = "/order";

export const useGetTaskOrdersQuery = () =>
  useQuery<TaskOrder[], null>({
    queryKey: ["taskOrders"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}`,
      );
      return response.data;
    },
  });

export const useUpdateTaskSortOrderMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (taskOrder: TaskOrder[]) =>
      axios.put(`${process.env.REACT_APP_BASE_URL}${BASE_URL}`, taskOrder),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["tasks", "taskOrders"] });
    },
  });
