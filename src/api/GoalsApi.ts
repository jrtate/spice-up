import axios from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Goal } from "../models/Goal";

const BASE_URL = "/goals";

export const useGetGoalsQuery = () =>
  useQuery<Goal[], null>({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}`,
      );
      return response.data;
    },
  });

export const useAddGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (goal: Goal) =>
      axios.post(`${process.env.REACT_APP_BASE_URL}${BASE_URL}`, goal),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useEditGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (goal: Goal) =>
      axios.put(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}/${goal.id}`,
        goal,
      ),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

export const useDeleteGoalMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${process.env.REACT_APP_BASE_URL}${BASE_URL}/${id}`),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
