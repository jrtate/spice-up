import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Settings } from "../models/Settings";
import api from "./Api";

const BASE_URL = "/settings";

export const useGetSettingsQuery = () =>
  useQuery<Settings, null>({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await api.get(`${BASE_URL}`);
      return (
        response.data[0] || { workBlockDuration: 25, breakBlockDuration: 5 }
      );
    },
  });

export const useUpdateSettingsMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (settings: Settings) => api.put(`${BASE_URL}`, settings),
    onSuccess: () => {
      // Invalidate and re-fetch
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["taskBlocks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
