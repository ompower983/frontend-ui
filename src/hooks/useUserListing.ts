"use client";

import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUsersQuery,
} from "@/api";

import { RoleFilter, StatusFilter, UserListParams, UserRow } from "@/types";

import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";

import { useDebounce } from "./useDebounce";
import { AppToast } from "@/components";

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  FILTER_KEYS,
  SEARCH_DEBOUNCE_MS,
} from "@/constants";
import { ROLE_IDS, ROLES } from "@/config";

const { SEARCH, ROLE, STATUS } = FILTER_KEYS;

export const useUserListing = () => {
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(
    search,
    SEARCH_DEBOUNCE_MS,
  );

  const [roleFilter, setRoleFilter] =
    useState<RoleFilter>(ROLES.MANAGER);

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [page, setPage] =
    useState<number>(DEFAULT_PAGE);

  const [rowsPerPage, setRowsPerPage] =
    useState<number>(DEFAULT_PAGE_SIZE);

  const trimmedSearch = debouncedSearch.trim();

  // ----------------------------------------------------
  // API PARAMETERS
  // ----------------------------------------------------

  const listParams = useMemo((): UserListParams => {
    const params: UserListParams = {
      page,
      pageSize: rowsPerPage,
    };

    // Search
    if (trimmedSearch.length >= 2) {
      params.search = trimmedSearch;
    }

    if (
      roleFilter !== "all" &&
      roleFilter !== undefined
    ) {
      const roleId =
        roleFilter === ROLES.ADMIN
          ? ROLE_IDS.ADMIN
          : roleFilter === ROLES.MANAGER
            ? ROLE_IDS.MANAGER
            : roleFilter === ROLES.HR
              ? ROLE_IDS.HR
              : roleFilter === ROLES.EMPLOYEE
                ? ROLE_IDS.EMPLOYEE
                : undefined;

      if (roleId !== undefined) {
        params.roleId = roleId;
      }
    }

    // Status
    if (statusFilter === "active") {
      params.status = true;
    }

    if (statusFilter === "inactive") {
      params.status = false;
    }

    return params;
  }, [
    trimmedSearch,
    page,
    rowsPerPage,
    roleFilter,
    statusFilter,
  ]);

  // ----------------------------------------------------
  // USERS QUERY
  // ----------------------------------------------------

  const {
    data: queryData,
    isLoading,
  } = useUsersQuery(listParams);

  // ----------------------------------------------------
  // MUTATIONS
  // ----------------------------------------------------

  const {
    mutateAsync: deleteUser,
    isPending: isDeleting,
  } = useDeleteUserMutation();

  const {
    mutateAsync: updateUser,
  } = useUpdateUserMutation();

  // ----------------------------------------------------
  // DATA
  // ----------------------------------------------------

  const data: UserRow[] =
    queryData?.items ?? [];

  const pageInfo =
    queryData?.page_info;

  // ----------------------------------------------------
  // PAGINATION
  // ----------------------------------------------------

  const pagination = useMemo(
    () => ({
      current:
        pageInfo?.current_page ??
        page,

      pageSize:
        pageInfo?.page_size ??
        rowsPerPage,

      total:
        pageInfo?.total_count ??
        data.length,
    }),
    [
      pageInfo,
      page,
      rowsPerPage,
      data,
    ],
  );

  // ----------------------------------------------------
  // TABLE CHANGE
  // ----------------------------------------------------

  const handleTableChange: TableProps<UserRow>["onChange"] = useCallback(
    (pagination: any) => {
      const newPage = pagination.current ?? DEFAULT_PAGE;
      const newPageSize = pagination.pageSize ?? DEFAULT_PAGE_SIZE;

      if (newPageSize !== rowsPerPage) {
        setPage(DEFAULT_PAGE);
        setRowsPerPage(newPageSize);
      } else {
        setPage(newPage);
      }
    },
    [rowsPerPage],
  );

  // ----------------------------------------------------
  // FILTER CHANGE
  // ----------------------------------------------------

  const handleFilterChange = useCallback(
    (name: string, value: string | undefined) => {
      if (name === SEARCH && typeof value === "string") {
        setSearch(value);
        setPage(DEFAULT_PAGE);
      }
      if (name === ROLE && typeof value === "string") {
        setRoleFilter(value as RoleFilter);
        setPage(DEFAULT_PAGE);
      }
      if (name === STATUS && typeof value === "string") {
        setStatusFilter(value as StatusFilter);
        setPage(DEFAULT_PAGE);
      }
    },
    [],
  );

  // ----------------------------------------------------
  // DELETE
  // ----------------------------------------------------

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteUser(id);
    },
    [deleteUser],
  );
  // ----------------------------------------------------
  // ACTIVE / INACTIVE
  // ----------------------------------------------------

  const handleToggle = useCallback(
    async (id: number, isActive: boolean) => {
      try {
        await updateUser({
          id,
          payload: { isActive },
        });
        AppToast.success(isActive ? "User activated" : "User deactivated");
      } catch {
        AppToast.error("Failed to update user status");
      }
    },
    [updateUser],
  );
  return {
    data,
    isLoading,
    isDeleting,
    pagination,
    searchValue: search,
    roleFilter,
    statusFilter,
    handleFilterChange,
    handleTableChange,

    handleDelete,
    handleToggle,
  };
};