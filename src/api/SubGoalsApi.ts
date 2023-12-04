import { QueryClient, useMutation } from "@tanstack/react-query";
import { SubGoal } from "../models/Goal";
import api from "./Api";

const BASE_URL = "/sub-goals";

export const useAddSubGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (subGoal: SubGoal) => api.post(`${BASE_URL}`, subGoal),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useEditSubGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (subGoal: SubGoal) =>
      api.put(`${BASE_URL}/${subGoal.id}`, subGoal),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useDeleteSubGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) => api.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
