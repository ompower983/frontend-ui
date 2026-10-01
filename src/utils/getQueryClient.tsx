import { QueryClient } from "@tanstack/react-query";

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  });