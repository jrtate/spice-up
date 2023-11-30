import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "/goal-completion";

export const useCompleteGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) =>
      axios.post(`${process.env.REACT_APP_BASE_URL}${BASE_URL}/complete/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useUnCompleteGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) =>
      axios.delete(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}/uncomplete/${id}`,
      ),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
