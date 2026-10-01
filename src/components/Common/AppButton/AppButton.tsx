"use client";
import { Button } from "antd";
import { ReactNode } from "react";

interface AppButtonProps {
  type?: "primary" | "dashed" | "link" | "text" | "default";
  icon?: ReactNode;
  size?: "large" | "medium" | "middle" | "small";
  htmlType?: "submit" | "reset" | "button";
  block?: boolean;
  label?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean | { delay: number; icon: ReactNode };
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const AppButton = ({
  icon,
  type,
  size,
  htmlType,
  block,
  label,
  disabled,
  loading,
  className = "",
  onClick,
}: AppButtonProps) => {
  return (
    <Button
      icon={icon}
      type={type}
      size={size}
      htmlType={htmlType}
      block={block}
      disabled={disabled}
      loading={loading}
      className={className ? className : ""}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
