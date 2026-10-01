"use client";
import { DashboardCardItem } from "@/types";
import { Avatar, BorderBeam, Card, Typography } from "antd";
import { FC } from "react";

const { Title, Text } = Typography;

interface DashboardCardProps {
  data: DashboardCardItem;
  isLoading: boolean;
}

export const DashboardCard: FC<DashboardCardProps> = ({ data, isLoading }) => {
  const { title, count, icon: Icon, prefix } = data;

  return (
    <>
      <BorderBeam color="#a855f7">
        <Card className="h-full rounded-xl border-0 bg-linear-to-r! from-indigo-600 to-violet-600 text-white shadow-md">
          {/* <Card className="h-full rounded-xl border-0 bg-black! text-white shadow-md"> */}
          {isLoading ? (
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-3">
                <div className="h-5 w-28 rounded bg-gray-300 animate-pulse lg:w-36" />
                <div className="h-7 w-12 rounded bg-gray-300 animate-pulse lg:w-16" />
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <Title
                  level={4}
                  className="mb-3! text-base! sm:text-lg! lg:text-xl! text-white! break-keep! leading-snug!"
                >
                  {title}
                </Title>
                <Text className="block text-xl! sm:text-2xl! lg:text-3xl! font-bold! text-white!">
                  {prefix ? `${prefix} ${count}` : count}
                </Text>
              </div>
              <Avatar
                size={72}
                className="bg-transparent! shrink-0"
                icon={data.icon ? <Icon className="text-white" /> : null}
              />
            </div>
          )}
        </Card>
      </BorderBeam>
    </>
  );
};
