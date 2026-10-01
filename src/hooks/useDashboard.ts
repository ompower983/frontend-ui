"use client";

import { useDashboardQuery } from "@/api";
import { DashboardCardItem } from "@/types";
import {
  TeamOutlined,
  UserOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";

export const useDashboard = () => {
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
  } = useDashboardQuery();

  const dashboardSummaryCards = useMemo<DashboardCardItem[]>(
    () => [
      {
        title: "Total Users",
        count: dashboardData?.totalUsers ?? 0,
        icon: TeamOutlined,
      },
      {
        title: "Active Users",
        count: dashboardData?.activeUsers ?? 0,
        icon: UserOutlined,
      },
      {
        title: "Inactive Users",
        count: dashboardData?.inactiveUsers ?? 0,
        icon: UserDeleteOutlined,
      },
    ],
    [dashboardData],
  );

  return {
    dashboardSummaryCards,

    isDashboardSummaryLoading: isDashboardLoading,

    isLoading: isDashboardLoading,
  };
};