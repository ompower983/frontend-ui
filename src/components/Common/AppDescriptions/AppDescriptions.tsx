import { Descriptions, DescriptionsProps } from "antd";

interface AppDescriptionsProps {
  items: DescriptionsProps["items"];
}

export const AppDescriptions = ({ items }: AppDescriptionsProps) => {
  return (
    <Descriptions
      bordered
      size="middle"
      column={{ xs: 1, sm: 1, md: 2 }}
      items={items}
      className="overflow-hidden"
      styles={{
        label: { width: 220, fontWeight: 600 },
        content: { width: 320 },
      }}
    />
  );
};
