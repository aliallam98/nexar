// contexts/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { User } from "../graphql/types";

// GraphQL Query for authenticated user
const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      phone
      image
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  hasPermission?: (slug: string) => boolean;
  hasAnyPermission?: (slugs: string[]) => boolean;
  hasAllPermissions?: (slugs: string[]) => boolean;
};

const TOKEN_KEY = "auth_token";

// Protected routes that require authentication
const PROTECTED_ROUTES = ["/admin", "/profile"];

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password", "/"];

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  // Check if current route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Check if token exists on mount and page reload
  useEffect(() => {
    const token = Cookies.get(TOKEN_KEY);

    if (token) {
      // Token exists, fetch user data
      setShouldFetch(true);
    } else {
      // No token, clear user and redirect if on protected route
      setUser(null);
      if (isProtectedRoute) {
        router.push(`/login?redirectTo=${pathname}`);
      }
    }
  }, [pathname, isProtectedRoute, router]);

  // Query to get authenticated user (only runs when shouldFetch is true)
  // const { loading, refetch } = useQuery(ME_QUERY, {
  //   skip: !shouldFetch, // Don't run query until token is confirmed
  //   fetchPolicy: "network-only",
  //   onCompleted: (data) => {
  //     if (data?.meEmployee) {
  //       setUser(data.meEmployee);
  //     } else {
  //       // Query succeeded but no user (invalid token)
  //       setUser(null);
  //       Cookies.remove(TOKEN_KEY);
  //       if (isProtectedRoute) {
  //         router.push(`/login?redirectTo=${pathname}`);
  //       }
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Auth query error:", error);
  //     setUser(null);
  //     Cookies.remove(TOKEN_KEY);
  //     if (isProtectedRoute) {
  //       router.push(`/login?redirectTo=${pathname}`);
  //     }
  //   },
  // });

  // Refetch user when token changes
  useEffect(() => {
    const token = Cookies.get(TOKEN_KEY);
    if (token && shouldFetch) {
      // refetch();
    }
  }, [shouldFetch]);
  //ceefhrt;

  // Clear user and stop fetching
  const clearUser = () => {
    setUser(null);
    setShouldFetch(false);
  };

  // Permission checker functions
  // const hasPermission = (slug: string): boolean => {
  //   if (!user) return false;
  //   return user.role.permissions.some((perm) => perm.slug === slug);
  // };

  // const hasAnyPermission = (slugs: string[]): boolean => {
  //   if (!user) return false;
  //   return user.role.permissions.some((perm) => slugs.includes(perm.slug));
  // };

  // const hasAllPermissions = (slugs: string[]): boolean => {
  //   if (!user) return false;
  //   return slugs.every((slug) =>
  //     user.role.permissions.some((perm) => perm.slug === slug)
  //   );
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        // loading,
        setUser,
        clearUser,
        // hasPermission,
        // hasAnyPermission,
        // hasAllPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
