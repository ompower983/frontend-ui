import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAMESPACE, storageKeys } from "./constants";
import { UserRole } from "./config";
import { canAccessRoute } from "./utils";

const publicRoutes = ["/login"];

const getNamespacedCookieName = (key: string) => `${COOKIE_NAMESPACE}__${key}`;

const getCookieValue = <T>(
  request: NextRequest,
  key: string,
): T | undefined => {
  const cookie = request.cookies.get(getNamespacedCookieName(key));

  if (!cookie?.value) return undefined;

  try {
    const parsed = JSON.parse(cookie.value);
    return parsed?.value as T | undefined;
  } catch {
    return undefined;
  }
};

const isPublicRoute = (pathname: string) =>
  publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = getCookieValue<string>(request, storageKeys.ACCESS_TOKEN);
  const hasValidToken = Boolean(accessToken);
  const userRole = getCookieValue<{ roleName?: UserRole }>(
    request,
    storageKeys.USER_PROFILE,
  )?.roleName;

  if (!isPublicRoute(pathname) && !hasValidToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute(pathname) && hasValidToken && pathname === "/login") {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  if (hasValidToken && !isPublicRoute(pathname)) {
    if (!userRole) {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = "/";
      return NextResponse.redirect(homeUrl);
    }

    if (!canAccessRoute(pathname, userRole)) {
      const unauthorizedUrl = request.nextUrl.clone();
      const fallbackPath = pathname === "/" ? "/login" : "/forbidden";

      if (pathname === "/" && fallbackPath === "/login") {
        return NextResponse.redirect("/login");
      }

      unauthorizedUrl.pathname = fallbackPath;
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};