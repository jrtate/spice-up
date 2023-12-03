import { QueryClient, useMutation } from "@tanstack/react-query";
import api from "./Api";

const BASE_URL = "/sub-goal-completion";

export const useCompleteSubGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) => api.post(`${BASE_URL}/complete/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useUnCompleteSubGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) => api.delete(`${BASE_URL}/uncomplete/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
