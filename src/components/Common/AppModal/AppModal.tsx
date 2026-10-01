"use client";
import { Modal } from "antd";
import { CSSProperties, ReactNode } from "react";

interface AppModalProps {
  isModalOpen: boolean;
  title: ReactNode | string;
  onClose: () => void;
  children: ReactNode;
  width?: number | string;
  style?: CSSProperties;
}

export const AppModal = ({
  isModalOpen,
  title,
  onClose,
  children,
  width,
  style,
}: AppModalProps) => (
  <Modal
    open={isModalOpen}
    title={title}
    onCancel={onClose}
    footer={null}
    destroyOnHidden
    centered
    width={width}
    style={style}
  >
    {children}
  </Modal>
);
