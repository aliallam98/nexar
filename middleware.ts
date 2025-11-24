// middleware.ts
import { i18nRouter } from "next-i18n-router";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { jwtDecode } from "jwt-decode";
import i18nConfig from "./i18nConfig";

/**
 * JWT payload structure
 */
type JwtPayload = {
  exp: number;
  role?: string;
  permissions?: string[];
};

/**
 * Authentication token cookie name
 */
const TOKEN_KEY = "authToken";

/**
 * Route configuration
 */
const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
  UNAUTHORIZED: "/unauthorized",
  HOME: "/",
};

/**
 * Public routes that don't require authentication
 */
const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/",
];

/**
 * Protected routes that require authentication
 */
// const protectedRoutes = ["/profile"];

/**
 * Admin routes that require admin role
 */
const adminRoutes = ["/admin"];

/**
 * Check if a JWT token is expired
 * @param token - JWT token string
 * @returns true if expired or invalid
 */
function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

/**
 * Get decoded token payload
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
function getTokenPayload(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

/**
 * Check if user has admin role
 * @param token - JWT token string
 * @returns true if user is admin
 */
function isAdmin(token: string): boolean {
  const payload = getTokenPayload(token);
  return payload?.role === "ADMIN" || payload?.role === "super-admin";
}

/**
 * Middleware function for authentication, i18n routing, and route protection
 *
 * **Features:**
 * - Handles internationalization (i18n) routing
 * - Protects authenticated routes
 * - Protects admin routes
 * - Validates JWT token expiration
 * - Redirects to login with return URL
 * - Prevents authenticated users from accessing login/register
 *
 * @param request - Next.js request object
 * @returns Next.js response (redirect or continue)
 */
export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Get token from cookies
  const token = (await cookies()).get(TOKEN_KEY)?.value;
  const isTokenValid = token && !isTokenExpired(token);

  // Check route types
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  const isProtectedRoute = pathname.startsWith("/profile");

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  console.log({
    pathname,
    token,
    s: typeof token,
    isTokenValid,
    isPublicRoute,
    isProtectedRoute,
    isAdminRoute,
    isAdmin: isAdmin(token!),
  });

  // Handle public auth routes (login, register)
  if (isPublicRoute && (pathname === "/login" || pathname === "/register")) {
    // Redirect authenticated users away from login/register
    if (isTokenValid) {
      const redirectPath = request.nextUrl.searchParams.get("redirectTo");
      if (isAdmin(token)) {
        const dashboardUrl = new URL(redirectPath || ROUTES.ADMIN, origin);
        return NextResponse.redirect(dashboardUrl);
      } else {
        const homeUrl = new URL(redirectPath || ROUTES.HOME, origin);
        return NextResponse.redirect(homeUrl);
      }
    }
  }

  // Handle protected routes (dashboard, profile, settings)
  if (isProtectedRoute && !isTokenValid) {
    // Redirect to login with return URL
    const loginUrl = new URL(ROUTES.LOGIN, origin);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle admin routes
  if (isAdminRoute) {
    // Check authentication first
    if (!isTokenValid) {
      const loginUrl = new URL(ROUTES.LOGIN, origin);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin role
    if (!isAdmin(token)) {
      const unauthorizedUrl = new URL(ROUTES.UNAUTHORIZED, origin);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  // Continue with i18n routing
  return i18nRouter(request, i18nConfig);
}

/**
 * Middleware configuration
 * Specifies which routes the middleware should run on
 */
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|logo|images|.*\\..*).*)"],

  // matcher: [
  //   /*
  //    * Match all request paths except:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    * - public files (images, etc.)
  //    */

  //   "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  //   "/",
  //   "/(api|trpc)(.*)",
  // ],
};
/*
  nextUrl: {
  href: 'http://localhost:3000/dashboard',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/dashboard',
  search: '',
  searchParams: URLSearchParams {  },
  hash: ''
}
*/
