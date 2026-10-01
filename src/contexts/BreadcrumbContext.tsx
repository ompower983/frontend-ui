"use client";
import { createContext, useContext, useState, ReactNode, FC } from "react";

interface BreadcrumbContextType {
  breadcrumbs: string[];
  setBreadcrumbs: (breadcrumbs: string[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined,
);

export const BreadcrumbProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
  }
  return context;
};