"use client";
import { Skeleton, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/es/table";
import { useMemo } from "react";

type AppTableProps<T extends object> = TableProps<T> & {
  rowKey: string | ((record: T) => string);
  tableColumns: ColumnsType<T>;
  tableData: T[];
  pagination: TablePaginationConfig;
  onChange?: TableProps<T>["onChange"];
  onRow?: TableProps<T>["onRow"];
  loading?: boolean;
};

export const AppTable = <T extends object>({
  rowKey = "id",
  tableColumns,
  tableData,
  pagination,
  onChange,
  onRow,
  loading,
}: AppTableProps<T>) => {
  const skeletonColumns = useMemo(
    () =>
      tableColumns.map((column) => ({
        ...column,
        render: () => <Skeleton.Input active size="small" block />,
      })),
    [tableColumns],
  );

  const skeletonData = useMemo(
    () =>
      Array.from({ length: pagination ? (pagination.pageSize ?? 10) : 5 }).map(
        (_, index) => ({
          id: `skeleton-${index}`,
        }),
      ) as T[],
    [pagination?.pageSize],
  );

  return (
    <Table
      rowKey={loading ? "id" : rowKey}
      columns={loading ? skeletonColumns : tableColumns}
      dataSource={loading ? skeletonData : tableData}
      pagination={
        loading
          ? false
          : pagination
            ? { ...pagination, responsive: true, showSizeChanger: true }
            : false
      }
      onChange={onChange}
      onRow={loading ? undefined : onRow}
      scroll={{ x: "max-content" }}
    />
  );
};
