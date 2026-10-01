"use client";
import { Avatar, Dropdown, Layout, MenuProps, Space, theme } from "antd";
import clsx from "clsx";
import { AppButton } from "../../Common";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { DROPDOWN_ITEMS } from "@/config";
import { useAuthentication, useProfile } from "@/hooks";
import { useRouter } from "next/navigation";

const { Header } = Layout;

interface LayoutHeaderProps {
  isMobile: boolean;
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export const LayoutHeader = ({
  isMobile,
  collapsed,
  onToggleSidebar,
}: LayoutHeaderProps) => {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { handleLogout } = useAuthentication();
  const { data, isPending } = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const displayName = data?.fullName?.trim() ?? "";
  const displayRole = data?.role?.name?.trim() ?? "";

  const headerIcon =
    isMobile || collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout();
        break;
      case "profile":
        router.push("/profile");
        break;
    }
  };

  return (
    <Header
      style={{
        background: colorBgContainer,
        padding: 8,
        transition: "left 0.3s cubic-bezier(0.3, 0, 0, 1)",
      }}
      className={clsx(
        "fixed top-0 right-0 z-50 flex h-16 items-center px-4 shadow-sm",
        collapsed ? "desktop-header-collapsed" : "desktop-header",
      )}
    >
      <div>
        <AppButton
          type="text"
          icon={headerIcon}
          onClick={onToggleSidebar}
          className="flex h-10! w-10! items-center justify-center"
        />
      </div>
      <div className="ml-auto">
        <Dropdown
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
          menu={{
            items: DROPDOWN_ITEMS,
            onClick: onMenuClick,
          }}
          trigger={["click"]}
        >
          {isPending ? (
            <div className="flex items-center gap-3 rounded-lg px-2 py-1">
              <div
                className={`animate-pulse rounded-full bg-gray-200 ${isMobile ? "h-8 w-8" : "h-10 w-10"
                  }`}
              />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
              </div>
            </div>
          ) : (
            <Space className="cursor-pointer rounded-lg px-2 py-1">
              <Avatar
                size={isMobile ? "medium" : "large"}
                icon={!displayName ? <UserOutlined /> : undefined}
              >
                {displayName?.[0]?.toUpperCase()}
              </Avatar>
              <div className=" text-left md:block">
                <div className="font-semibold leading-none">
                  {displayName || "-"}
                </div>
                <div className="text-xs text-gray-500">
                  {displayRole || "-"}
                </div>
              </div>
              {isDropdownOpen ? (
                <UpOutlined className="text-sm text-gray-500" />
              ) : (
                <DownOutlined className="text-sm text-gray-500" />
              )}
            </Space>
          )}
        </Dropdown>
      </div>
    </Header>
  );
};
