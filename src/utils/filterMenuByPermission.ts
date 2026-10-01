import type { SidebarMenuItem, UserRole } from "@/config";

export const filterMenuByRole = (
  items: SidebarMenuItem[],
  role?: UserRole,
): SidebarMenuItem[] => {
  if (!role) return [];

  const result: SidebarMenuItem[] = [];

  for (const item of items) {
    if (item.roles && !item.roles.includes(role)) {
      continue;
    }

    const { roles: _roles, children, ...menuItem } = item;

    if (!children) {
      result.push(menuItem);
      continue;
    }

    const filteredChildren = filterMenuByRole(children, role);

    result.push(
      filteredChildren.length > 0
        ? { ...menuItem, children: filteredChildren }
        : menuItem,
    );
  }

  return result;
};
