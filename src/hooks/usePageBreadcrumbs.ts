"use client";

import { useEffect } from "react";
import { useBreadcrumbs } from "@/contexts";

export const usePageBreadcrumbs = (
  title?: string,
  breadcrumbs?: string[],
  baseBreadcrumb?: string,
) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    const items = [
      ...(baseBreadcrumb ? [baseBreadcrumb] : []),
      ...(title ? [title] : []),
    ];

    setBreadcrumbs(items);

    return () => {
      setBreadcrumbs([]);
    };
  }, [baseBreadcrumb, title, setBreadcrumbs]);
};