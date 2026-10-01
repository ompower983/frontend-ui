import { Skeleton } from "antd";

interface InputSkeletonProps {
  size?: "large" | "medium" | "middle" | "small";
  width?: number;
  height?: number;
}

export const InputSkeleton = ({
  size = "small",
  width = 150,
  height = 20,
}: InputSkeletonProps) => {
  return <Skeleton.Input active size={size} style={{ width, height }} />;
};
