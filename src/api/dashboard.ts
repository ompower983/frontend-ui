import { DASHBOARD_KEYS } from "@/constants";
import DashboardService from "@/services/dashboard";
import { DashboardResponse } from "@/types/dashboard.types";

import { useQuery } from "@tanstack/react-query";

const dashboardService = new DashboardService();

export const useDashboardQuery = () => {
  return useQuery<DashboardResponse>({
    queryKey: DASHBOARD_KEYS.summary,
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await dashboardService.getDashboard();
      return response.data?.data;
    },
  });
};