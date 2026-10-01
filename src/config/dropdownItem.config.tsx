"use client";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

export const DROPDOWN_ITEMS: MenuProps["items"] = [
  {
    key: "profile",
    label: "Profile",
    icon: <UserOutlined className="text-sm! text-gray-500" />,
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    label: "Logout",
    danger: true,
    icon: <LogoutOutlined className="text-sm! text-gray-500" />,
  },
];
