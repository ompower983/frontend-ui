"use client";
import {
  BankOutlined,
  DashboardOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { ALL_ROLES, UserRole } from "./permission.config";
import type { MenuItemType } from "antd/es/menu/interface";

export type SidebarMenuItem = MenuItemType & {
  roles?: readonly UserRole[];
  children?: SidebarMenuItem[];
};

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    key: "1",
    icon: <DashboardOutlined className="text-lg!" />,
    label: <Link href="/">Dashboard</Link>,
    roles: ALL_ROLES,
  },
  {
    key: "2",
    icon: <UserOutlined className="text-lg!" />,
    label: <Link href="/users">Users</Link>,
    roles: ALL_ROLES,
  },
  // {
  //   key: "3",
  //   icon: <SolutionOutlined className="text-lg!" />,
  //   label: <Link href="/customers">Customers</Link>,
  //   roles: ALL_ROLES,
  // },
  // {
  //   key: "4",
  //   icon: <BankOutlined className="text-lg!" />,
  //   label: <Link href="/loans">Loans</Link>,
  //   // label: <Link href="/loans">Users</Link>,
  //   roles: ALL_ROLES,
  // },
];
