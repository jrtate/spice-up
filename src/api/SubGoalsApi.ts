import axios from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { SubGoal } from "../models/Goal";

const BASE_URL = "/sub-goals";

export const useAddSubGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (subGoal: SubGoal) =>
      axios.post(`${process.env.REACT_APP_BASE_URL}${BASE_URL}`, subGoal),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useEditSubGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (subGoal: SubGoal) =>
      axios.put(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}/${subGoal.id}`,
        subGoal,
      ),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useDeleteSubGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${process.env.REACT_APP_BASE_URL}${BASE_URL}/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
