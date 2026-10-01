import { ROLE_ROUTES, UserRole } from "../config";

export const getRequiredRoles = (pathname: string): UserRole[] | undefined => {
  const exactMatch = ROLE_ROUTES[pathname];

  if (exactMatch) return exactMatch;

  let matchedRoute: string | undefined;

  for (const route of Object.keys(ROLE_ROUTES)) {
    if (
      route !== "/" &&
      pathname.startsWith(`${route}/`) &&
      (!matchedRoute || route.length > matchedRoute.length)
    ) {
      matchedRoute = route;
    }
  }

  return matchedRoute ? ROLE_ROUTES[matchedRoute] : undefined;
};

export const canAccessRoute = (pathname: string, role?: UserRole): boolean => {
  if (!role) return false;

  const requiredRoles = getRequiredRoles(pathname);
  return requiredRoles ? requiredRoles.includes(role) : true;
};
