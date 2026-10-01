"use client";
import { Tabs, TabsProps } from "antd";

interface AppTabsProps {
  items: TabsProps["items"];
  activeKey: string;
  onChange: (key: string) => void;
}

export const AppTabs = ({
  items,
  activeKey,
  onChange,
}: AppTabsProps) => {
  return (
    <Tabs
      items={items}
      activeKey={activeKey}
      onChange={onChange}
      animated
      className="font-semibold"
    />
  );
};
