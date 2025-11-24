// src/lib/auth.ts
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { cache } from "react";

/**
 * JWT payload structure
 */
type JwtPayload = {
  /** Token expiration timestamp (Unix time) */
  exp: number;
  /** Optional user ID from token */
  userId?: string;
};

/**
 * User object returned from the authentication API
 */
type User = {
  /** User's unique identifier */
  _id: string;
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** User's username */
  username: string;
  /** User's role information */
  role: {
    /** Role name (e.g., "admin", "employee") */
    name: string;
    /** List of permissions assigned to this role */
    permissions: {
      /** Permission unique identifier */
      _id: string;
      /** Human-readable permission name */
      name: string;
      /** Permission slug for programmatic checks */
      slug: string;
    }[];
  };
};

/**
 * Return type for server-side authentication functions
 */
type AuthServerReturn = {
  /** JWT access token from cookies, null if not found or expired */
  token: string | null;
  /** Authenticated user object, null if not authenticated */
  user: User | null;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /**
   * Check if user has a specific permission
   * @param slug - Permission slug to check
   * @returns true if user has the permission, false otherwise
   * @example
   * ```typescript
   * if (hasPermission("manage-users")) {
   *   // User can manage users
   * }
   * ```
   */
  hasPermission: (slug: string) => boolean;
  /**
   * Check if user has any of the specified permissions
   * @param slugs - Array of permission slugs to check
   * @returns true if user has at least one permission, false otherwise
   * @example
   * ```typescript
   * if (hasAnyPermission(["admin", "super-admin"])) {
   *   // User has admin privileges
   * }
   * ```
   */
  hasAnyPermission: (slugs: string[]) => boolean;
  /**
   * Check if user has all of the specified permissions
   * @param slugs - Array of permission slugs to check
   * @returns true if user has all permissions, false otherwise
   * @example
   * ```typescript
   * if (hasAllPermissions(["view-reports", "export-data"])) {
   *   // User can both view and export reports
   * }
   * ```
   */
  hasAllPermissions: (slugs: string[]) => boolean;
};

/** Cookie key for storing authentication token */
const TOKEN_KEY = "auth_token";

/**
 * Check if a JWT token is expired
 * @param token - JWT token string to validate
 * @returns true if token is expired or invalid, false if still valid
 * @private
 */
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

/**
 * Get authentication token from cookies
 * @returns JWT token string or null if not found
 * @private
 */
const getToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_KEY);
  return token?.value || null;
};

/**
 * Fetch user data from GraphQL API using authentication token
 * Uses React cache to prevent duplicate requests within the same render
 * @param token - Valid JWT authentication token
 * @returns User object or null if request fails
 * @private
 */
const fetchUser = cache(async (token: string): Promise<User | null> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query MeEmployee {
            meEmployee {
              _id
              firstName
              lastName
              username
              role {
                name
                permissions {
                  _id
                  name
                  slug
                }
              }
            }
          }
        `,
      }),
      cache: "no-store",
    });

    const { data, errors } = await response.json();

    if (errors || !data?.meEmployee) {
      return null;
    }

    return data.meEmployee;
  } catch (error) {
    console.error("Server auth error:", error);
    return null;
  }
});

/**
 * Get authenticated user and authorization state (Server-side only)
 *
 * This function retrieves the authentication token from cookies, validates it,
 * fetches the user data, and provides permission checking utilities.
 *
 * **Usage Context:**
 * - ✅ Server Components
 * - ✅ Server Actions
 * - ✅ Route Handlers (API Routes)
 * - ✅ Middleware
 * - ❌ Client Components (use useAuth hook instead)
 *
 * @returns {Promise<AuthServerReturn>} Authentication state with user data and permission helpers
 *
 * @example
 * Basic authentication check in a Server Component
 * ```typescript
 * import { getAuthServer } from "@/lib/auth";
 * import { redirect } from "next/navigation";
 *
 * export default async function DashboardPage() {
 *   const { user, isAuthenticated } = await getAuthServer();
 *
 *   if (!isAuthenticated) {
 *     redirect("/login");
 *   }
 *
 *   return <div>Welcome, {user?.firstName}!</div>;
 * }
 * ```
 *
 * @example
 * Permission-based access control
 * ```typescript
 * import { getAuthServer } from "@/lib/auth";
 * import { redirect } from "next/navigation";
 *
 * export default async function AdminPage() {
 *   const { isAuthenticated, hasPermission } = await getAuthServer();
 *
 *   if (!isAuthenticated) redirect("/login");
 *   if (!hasPermission("admin")) redirect("/unauthorized");
 *
 *   return <div>Admin Dashboard</div>;
 * }
 * ```
 *
 * @example
 * Multiple permission checks
 * ```typescript
 * const { hasAnyPermission, hasAllPermissions } = await getAuthServer();
 *
 * // User needs at least one of these
 * const isAdmin = hasAnyPermission(["admin", "super-admin"]);
 *
 * // User needs all of these
 * const canExport = hasAllPermissions(["view-reports", "export-data"]);
 * ```
 *
 * @example
 * Using in Server Actions
 * ```typescript
 * "use server";
 *
 * import { getAuthServer } from "@/lib/auth";
 *
 * export async function deleteUser(userId: string) {
 *   const { isAuthenticated, hasPermission } = await getAuthServer();
 *
 *   if (!isAuthenticated) {
 *     throw new Error("Unauthorized");
 *   }
 *
 *   if (!hasPermission("delete-users")) {
 *     throw new Error("Insufficient permissions");
 *   }
 *
 *   // Delete user logic...
 * }
 * ```
 *
 * @example
 * Using in API Route Handlers
 * ```typescript
 * import { getAuthServer } from "@/lib/auth";
 * import { NextResponse } from "next/server";
 *
 * export async function GET() {
 *   const { user, isAuthenticated } = await getAuthServer();
 *
 *   if (!isAuthenticated) {
 *     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 *   }
 *
 *   return NextResponse.json({ user });
 * }
 * ```
 *
 * @example
 * Conditional rendering based on permissions
 * ```typescript
 * export default async function DashboardPage() {
 *   const { user, hasPermission } = await getAuthServer();
 *
 *   const canManageUsers = hasPermission("manage-users");
 *   const canViewReports = hasPermission("view-reports");
 *
 *   return (
 *     <div>
 *       <h1>Welcome, {user?.firstName}!</h1>
 *       {canManageUsers && <UserManagementSection />}
 *       {canViewReports && <ReportsSection />}
 *     </div>
 *   );
 * }
 * ```
 */
export const getAuthServer = async (): Promise<AuthServerReturn> => {
  const token = await getToken();

  // Check if token is valid
  if (!token || isTokenExpired(token)) {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
      hasPermission: () => false,
      hasAnyPermission: () => false,
      hasAllPermissions: () => false,
    };
  }

  // Fetch user data
  const user = await fetchUser(token);

  if (!user) {
    return {
      token,
      user: null,
      isAuthenticated: false,
      hasPermission: () => false,
      hasAnyPermission: () => false,
      hasAllPermissions: () => false,
    };
  }

  // Permission checker functions
  const hasPermission = (slug: string): boolean => {
    return user.role.permissions.some((perm) => perm.slug === slug);
  };

  const hasAnyPermission = (slugs: string[]): boolean => {
    return user.role.permissions.some((perm) => slugs.includes(perm.slug));
  };

  const hasAllPermissions = (slugs: string[]): boolean => {
    return slugs.every((slug) =>
      user.role.permissions.some((perm) => perm.slug === slug)
    );
  };

  return {
    token,
    user,
    isAuthenticated: true,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};

/**
 * Alias for getAuthServer - shorter syntax for convenience
 *
 * @example
 * ```typescript
 * import { auth } from "@/lib/auth";
 *
 * const { user, isAuthenticated } = await auth();
 * ```
 */
export const auth = getAuthServer;
