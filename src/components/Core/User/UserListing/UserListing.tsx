"use client";
import {
  AppButton,
  AppSwitch,
  AppTable,
  AppTabs,
  DeleteModal,
  FilterInput,
  SearchInput,
} from "@/components/Common";
import { ROLES } from "@/config";
import { userRoleTabs, userStatus } from "@/constants";
import {
  useAuthorization,
  usePageBreadcrumbs,
  useResponsive,
  useUserListing,
} from "@/hooks";
import { RoleFilter, UserRow } from "@/types";
import { formatters } from "@/utils";
import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

interface UserListingProps {
  title: string;
  breadcrumbs?: string[];
}

export const UserListing: FC<UserListingProps> = ({ title, breadcrumbs }) => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { isAdmin, isManager, hasRole } = useAuthorization();
  const canAddUsers: boolean = hasRole([ROLES.ADMIN, ROLES.HR]);
  usePageBreadcrumbs(title, breadcrumbs);
  const {
    data,
    isLoading,
    isDeleting,
    pagination,
    searchValue,
    roleFilter,
    statusFilter,
    handleFilterChange,
    handleTableChange,
    handleDelete,
    handleToggle,
  } = useUserListing();

  const canManageUsers = useCallback(
    (roleName?: string) =>
      isAdmin ||
      (isManager && roleName === ROLES.MANAGER),
    [isAdmin, isManager],
  );

  const handleSearch = useCallback(
    (value: string) => {
      handleFilterChange?.("search", value);
    },
    [handleFilterChange],
  );

  const openDeleteModal = useCallback(
    ({ id, fullName }: UserRow) => {
      DeleteModal({
        title: "User",
        entityName: fullName,
        onDelete: () => handleDelete(id),
      });
    },
    [handleDelete],
  );

  const renderActive = useCallback(
    (val: boolean, row: UserRow) => {
      if (!canManageUsers(row?.role?.name)) {
        return (
          <span
            className={
              val ? "font-medium text-green-600" : "font-medium text-red-500"
            }
          >
            {val ? "Active" : "Inactive"}
          </span>
        );
      }

      return (
        <AppSwitch
          checked={val}
          onChange={(checked) => handleToggle(row.id, checked)}
        />
      );
    },
    [canManageUsers, handleToggle],
  );

  const renderActions = useCallback(
    (_: unknown, row: UserRow) => (
      <div className="flex items-center justify-center">
        {canManageUsers(row?.role?.name) ? (
          <EditOutlined
            title="Edit"
            onClick={() => router.push(`/users/${row.id}`)}
            className="cursor-pointer text-blue-500! hover:bg-blue-50! hover:text-blue-600! p-2 rounded-full text-lg md:text-xl transition-all"
          />
        ) : (
          <FileSearchOutlined
            title="View"
            onClick={() => router.push(`/users/${row.id}`)}
            className="cursor-pointer text-blue-500! hover:bg-blue-50! hover:text-blue-600! p-2 rounded-full text-lg md:text-xl transition-all"
          />
        )}
        {isAdmin && (
          <DeleteOutlined
            title="Delete"
            disabled={isDeleting}
            onClick={() => openDeleteModal(row)}
            className="cursor-pointer text-red-500! hover:bg-red-50! hover:text-red-600! p-2 rounded-full text-lg md:text-xl transition-all"
          />
        )}
      </div>
    ),
    [router, isAdmin, isDeleting, openDeleteModal, canManageUsers],
  );

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
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: formatters.dateTime,
      },
      {
        title: "Status",
        dataIndex: "isActive",
        key: "isActive",
        width: 180,
        render: renderActive,
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        fixed: "right",
        width: !isMobile ? 100 : 60,
        render: renderActions,
      },
    ],
    [isMobile, renderActive, renderActions],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold">User Listing</h2>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full xl:w-auto">
            <div className="w-full sm:flex-1 lg:w-80">
              <SearchInput
                prefixIcon={<SearchOutlined />}
                value={searchValue}
                className="w-full h-10!"
                onSearch={handleSearch}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-40">
                <FilterInput
                  placeholder="All Status"
                  filterKey="status"
                  value={statusFilter}
                  options={userStatus}
                  className="w-full h-10!"
                  onChange={handleFilterChange}
                />
              </div>
              {canAddUsers && (
                <div className="w-full sm:w-auto sm:ml-auto">
                  <AppButton
                    icon={<PlusOutlined />}
                    label="New User"
                    className="w-full sm:w-auto h-10! px-4 shrink-0 whitespace-nowrap"
                    onClick={() => router.push("/users/add-user")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AppTabs
        items={userRoleTabs}
        activeKey={roleFilter}
        onChange={(key) =>
          handleFilterChange("role", key as RoleFilter)
        }
      />
      <AppTable
        rowKey={(record: any) => record.id}
        tableColumns={columns}
        tableData={data}
        pagination={pagination}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </>
  );
};
