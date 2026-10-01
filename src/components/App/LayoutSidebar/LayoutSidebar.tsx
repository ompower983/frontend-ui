"use client";
import { Drawer, Layout, Menu } from "antd";
import Image from "next/image";
import Logo from "@/assets/Logo2.png";
import { AppButton } from "../../Common";
import { CloseOutlined } from "@ant-design/icons";
import { useAuthorization } from "@/hooks";
import Link from "next/link";

const { Sider } = Layout;

const drawerStyles = {
  body: {
    padding: 0,
  },
};

interface LayoutSidebarProps {
  selectedKey: string[];
  isMobile: boolean;
  collapsed: boolean;
  drawerOpen: boolean;
  onClose: () => void;
}

interface DesktopSidebarProps {
  selectedKey: string[];
  collapsed: boolean;
}

interface MobileDrawerProps {
  selectedKey: string[];
  drawerOpen: boolean;
  onClose: () => void;
}

interface SidebarMenuProps {
  selectedKey: string[];
  mobile?: boolean;
  onClose?: () => void;
}

interface AppLogoProps {
  collapsed?: boolean;
}

export const LayoutSidebar = ({
  selectedKey,
  isMobile,
  collapsed,
  drawerOpen,
  onClose,
}: LayoutSidebarProps) => {
  return isMobile ? (
    <MobileDrawer
      selectedKey={selectedKey}
      drawerOpen={drawerOpen}
      onClose={onClose}
    />
  ) : (
    <DesktopSidebar selectedKey={selectedKey} collapsed={collapsed} />
  );
};

const DesktopSidebar = ({ collapsed, selectedKey }: DesktopSidebarProps) => (
  <div className="hidden md:block">
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={260}
      collapsedWidth={90}
      className="fixed! left-0 top-0 bottom-0 h-screen overflow-auto shadow-lg bg-linear-to-br! from-indigo-700 to-blue-600"
    // className="fixed! left-0 top-0 bottom-0 h-screen overflow-auto shadow-lg bg-black"
    >
      <div className="flex h-16 items-center justify-center border-gray-700">
        <AppLogo collapsed={collapsed} />
      </div>
      <SidebarMenu selectedKey={selectedKey} />
    </Sider>
  </div>
);

const MobileDrawer = ({
  selectedKey,
  drawerOpen,
  onClose,
}: MobileDrawerProps) => (
  <div className="block md:hidden">
    <Drawer
      placement="left"
      open={drawerOpen}
      onClose={onClose}
      size={260}
      closable={false}
      styles={drawerStyles}
      className="shadow-lg bg-linear-to-br! from-indigo-700 to-blue-600"
    // className="shadow-lg bg-black!"
    >
      <div className="flex h-16 items-center justify-between px-4">
        <AppLogo />
        <AppButton
          type="text"
          icon={<CloseOutlined />}
          size="large"
          className="text-white!"
          onClick={onClose}
        />
      </div>
      <SidebarMenu selectedKey={selectedKey} mobile onClose={onClose} />
    </Drawer>
  </div>
);

const SidebarMenu = ({ selectedKey, mobile, onClose }: SidebarMenuProps) => {
  const { menuItems, isLoading } = useAuthorization();

  if (isLoading) return null;

  return (
    <Menu
      mode="inline"
      items={menuItems}
      selectedKeys={selectedKey}
      onClick={mobile ? onClose : undefined}
      theme={mobile ? "light" : "dark"}
      className="bg-transparent! text-white! text-base! font-medium"
    />
  );
};

const AppLogo = ({ collapsed }: AppLogoProps) => (
  <Link
    href="/"
    aria-label="Go to Home"
    className="flex cursor-pointer items-center justify-center"
  >
    <Image
      src={Logo}
      alt="Om Power Transmission Limited"
      width={collapsed ? 50 : 60}
      height={collapsed ? 50 : 60}
      priority
      sizes="100vw"
      className="object-cover transition-all duration-300"
    />
  </Link>
);