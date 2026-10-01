import { type ComponentType } from "react";

export interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface DashboardResponse extends DashboardData { }

export interface DashboardCardItem {
  title: string;
  count: number;
  icon: ComponentType<{ className?: string }>;
  prefix?: string;
}