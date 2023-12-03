import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Goal } from "../models/Goal";
import api from "./Api";

const BASE_URL = "/goals";

export const useGetGoalsQuery = () =>
  useQuery<Goal[], null>({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await api.get(`${BASE_URL}`);
      return response.data;
    },
  });

export const useAddGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (goal: Goal) => api.post(`${BASE_URL}`, goal),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useEditGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (goal: Goal) => api.put(`${BASE_URL}/${goal.id}`, goal),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useDeleteGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) => api.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
