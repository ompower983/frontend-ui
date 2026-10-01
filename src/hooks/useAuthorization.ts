"use client";
import { SIDEBAR_MENU_ITEMS, UserRole } from "@/config";
import { AuthService } from "@/services";
import { UserProfile } from "@/types";
import { filterMenuByRole } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

const authService = new AuthService();

export const useAuthorization = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profile = authService.getUserProfile();
    setUser(profile ?? null);
    setIsLoading(false);
  }, []);

  const role = user?.roleName as UserRole | undefined;

  const menuItems = useMemo(
    () => (role ? filterMenuByRole(SIDEBAR_MENU_ITEMS, role) : []),
    [role],
  );

  const hasRole = useCallback(
    (roles: UserRole | UserRole[]) => {
      if (!role) return false;
      return Array.isArray(roles) ? roles.includes(role) : roles === role;
    },
    [role],
  );

  return {
    user,
    role,
    isLoading,
    menuItems,
    hasRole,
    isAdmin: role === "Admin",
    isManager: role === "Manager",
  };
};
