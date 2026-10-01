"use client";

import { AppButton, AppTable } from "@/components/Common";
import { roleList } from "@/constants";
import { useUsersQuery } from "@/api";
import { useResponsive } from "@/hooks";
import { UserRow } from "@/types";
import { createOptionMap, formatters } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const ROLE_MAP = createOptionMap(roleList);

export const RecentUserTable = () => {
  const router = useRouter();
  const { isMobile } = useResponsive();

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useUsersQuery({
    page: 1,
    pageSize: 5,
  });

  const users = userData?.items ?? [];

  const columns = useMemo<ColumnsType<UserRow>>(
    () => [
      {
        title: "Name",
        dataIndex: "fullName",
        key: "fullName",
        fixed: !isMobile ? "left" : undefined,
        width: 180,
        render: formatters.value,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        responsive: ["md"],
        width: 250,
        render: formatters.value,
      },
      {
        title: "Mobile Number",
        dataIndex: "phone",
        key: "phone",
        width: 180,
        render: formatters.value,
      },
      {
        title: "Role",
        dataIndex: "roleId",
        key: "roleId",
        width: 180,
        render: (val) => ROLE_MAP[val] ?? "--",
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: formatters.dateTime,
      },
    ],
    [isMobile],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Users
        </h2>

        {users.length > 0 && (
          <AppButton
            type="dashed"
            label="View All"
            onClick={() => router.push("/users")}
          />
        )}
      </div>

      <AppTable
        rowKey={(record: UserRow) => String(record.id)}
        tableColumns={columns}
        tableData={users}
        pagination={false}
        loading={isLoading}
        onRow={(record) => ({
          onClick: () => router.push(`/users/${record.id}`),
          className: "cursor-pointer hover:bg-gray-50",
        })}
      />
    </div>
  );
};