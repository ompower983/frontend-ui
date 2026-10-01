import { OptionItem } from "@/types";
import { Tag } from "antd";

type AppTagProps<T extends string> = {
  value?: T;
  options: OptionItem<T>[];
  variant?: "filled" | "outlined" | "solid";
  fallback?: string;
};

export const AppTag = <T extends string>({
  value,
  options,
  variant = "solid",
  fallback = "--",
}: AppTagProps<T>) => {
  if (!value) return <span>{fallback}</span>;

  const option = options.find((item) => item.value === value);

  return (
    <Tag
      color={option?.color ?? "default"}
      variant={variant}
      className="font-bold"
    >
      {option?.label ?? fallback}
    </Tag>
  );
};
