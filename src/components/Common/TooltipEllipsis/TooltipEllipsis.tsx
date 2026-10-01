import { Tooltip } from "antd";
import { CSSProperties, ReactNode } from "react";

interface TooltipEllipsisProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const TooltipEllipsis = ({ children, style }: TooltipEllipsisProps) => {
  return (
    <Tooltip title={children}>
      <span
        style={{
          display: "inline-block",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          cursor: "pointer",
          ...style,
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};
