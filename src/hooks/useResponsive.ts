"use client";

import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const useResponsive = () => {
  const screens = useBreakpoint();

  return {
    screens,
    isMobile: !screens.md,
    isTablet: !!screens.md && !screens.lg,
    isDesktop: !!screens.lg,
    isXL: !!screens.xl,
    is2XL: !!screens.xxl,
  };
};
