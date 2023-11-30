import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Settings } from "../models/Settings";

const BASE_URL = "/settings";

export const useGetSettingsQuery = () =>
  useQuery<Settings, null>({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}`,
      );
      return response.data[0];
    },
  });

export const useUpdateSettingsMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (settings: Settings) =>
      axios.put(`${process.env.REACT_APP_BASE_URL}${BASE_URL}`, settings),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["taskBlocks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
