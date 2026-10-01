"use client";
import { Modal } from "antd";
import { AppToast } from "../AppToast";

interface DeleteModalProps {
  title: string;
  entityName: string;
  onDelete: () => Promise<void>;
}

export const DeleteModal = ({
  title,
  entityName = "this item",
  onDelete,
}: DeleteModalProps) => {
  Modal.confirm({
    title: `Delete ${title}`,
    content: `Are you sure you want to delete ${entityName}?`,
    okType: "danger",
    okText: "Delete",
    cancelText: "Cancel",
    centered: true,

    onOk: async () => {
      try {
        await onDelete();
        AppToast.success(`${entityName} deleted successfully`);
      } catch (error: any) {
        AppToast.error(error?.response?.data?.message ?? `Failed to delete ${entityName}`);
        return;
      }
    },
  });
};
