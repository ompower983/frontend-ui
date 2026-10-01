"use client";
import { FC, ReactNode, useCallback, useState } from "react";
import { Layout } from "antd";
import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/contexts";
import { useResponsive } from "@/hooks";
import clsx from "clsx";
import { LayoutSidebar } from "../LayoutSidebar";
import { LayoutHeader } from "../LayoutHeader";
import { LayoutContent } from "../LayoutContent";

const { Footer } = Layout;

const PUBLIC_ROUTES = ["/login"];

const ROUTE_MAP: Record<string, string> = {
  "/users": "2",
  "/customers": "3",
  "/loans": "4"
};

interface AppProps {
  children: ReactNode;
  breadcrumbs?: string[];
}

export const App: FC<AppProps> = ({
  children,
  breadcrumbs: breadcrumbsProp,
}) => {
  const pathname = usePathname();
  const { breadcrumbs: breadcrumbsContext } = useBreadcrumbs();
  const { isMobile } = useResponsive();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const breadcrumbs =
    breadcrumbsContext.length > 0 ? breadcrumbsContext : breadcrumbsProp ?? [];

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route),
  );

  const selectedKey = [
    Object.entries(ROUTE_MAP).find(([route]) =>
      pathname.startsWith(route),
    )?.[1] ?? "1",
  ];

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setCollapsed((prev) => !prev);
    }
  }, [isMobile]);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <Layout className="min-h-screen">
      <LayoutSidebar
        selectedKey={selectedKey}
        isMobile={isMobile}
        collapsed={collapsed}
        drawerOpen={drawerOpen}
        onClose={closeDrawer}
      />
      <Layout
        className={clsx(
          collapsed ? "desktop-sider-collapsed" : "desktop-sider",
        )}
      >
        <LayoutHeader
          isMobile={isMobile}
          collapsed={collapsed}
          onToggleSidebar={toggleSidebar}
        />
        <LayoutContent breadcrumbs={breadcrumbs}>{children}</LayoutContent>
        <Footer className="text-center text-gray-500! md:text-base! font-medium">
          {/* Ant Design Created by Ant UED */}
          © 2026 OPTL Digital. All Rights Reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};