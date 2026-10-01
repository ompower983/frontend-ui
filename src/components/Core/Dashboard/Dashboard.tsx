"use client";

import { FC } from "react";
import { useDashboard, usePageBreadcrumbs } from "@/hooks";
import { RecentUserTable } from "./RecentUserTable";
import { DashboardCard } from "./DashboardCard";

interface DashboardProps {
  title: string;
  breadcrumbs?: string[];
}

export const Dashboard: FC<DashboardProps> = ({
  title,
  breadcrumbs,
}) => {
  usePageBreadcrumbs(title, breadcrumbs);

  const {
    dashboardSummaryCards,
    isDashboardSummaryLoading,
  } = useDashboard();

  return (
    <>
      <div className="space-y-6">

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardSummaryCards?.map((item, index) => (
            <DashboardCard
              key={index}
              data={item}
              isLoading={isDashboardSummaryLoading}
            />
          ))}
        </div>

        {/* Recent Users */}
        <div className="flex flex-col gap-6">
          <RecentUserTable />
        </div>

      </div>
    </>
  );
};