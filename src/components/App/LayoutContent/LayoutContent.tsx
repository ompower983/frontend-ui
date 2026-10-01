"use client";
import { Breadcrumb, BreadcrumbProps, Layout } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

const { Content } = Layout;

const BREADCRUMB_PATHS: Record<string, string> = {
  Home: "/",
  Users: "/users"
};

interface LayoutContentProps {
  children: ReactNode;
  breadcrumbs?: string[];
}

export const LayoutContent = ({
  children,
  breadcrumbs,
}: LayoutContentProps) => {
  const pathname = usePathname();

  const breadcrumbItems = useMemo<BreadcrumbProps["items"]>(() => {
    const allBreadcrumbs =
      pathname === "/" ? (breadcrumbs ?? []) : ["Home", ...(breadcrumbs ?? [])];

    return allBreadcrumbs.map((crumb, index) => {
      const isLast = index === allBreadcrumbs.length - 1;
      const href = !isLast ? BREADCRUMB_PATHS[crumb] : undefined;

      return {
        title: href ? (
          <Link
            href={href}
            className="hover:bg-transparent! hover:text-inherit!"
          >
            {crumb}
          </Link>
        ) : (
          crumb
        ),
      };
    });
  }, [breadcrumbs]);

  return (
    <Content className="mt-20! mx-3 mb-3 md:mx-4 md:mb-4">
      <div className="mb-3 overflow-x-auto">
        {breadcrumbs?.length ? (
          <Breadcrumb
            className="whitespace-nowrap! text-sm! sm:text-base! font-bold"
            items={breadcrumbItems}
          />
        ) : null}
      </div>
      <div className="min-h-[calc(100vh-160px)] rounded-xl bg-white p-4 shadow-sm md:p-6">
        {children}
      </div>
    </Content>
  );
};
