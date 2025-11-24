// src/components/sidebar/sidebarConfig.ts
import type { ElementType } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import { Security } from "@mui/icons-material";
import Store from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DiscountIcon from "@mui/icons-material/Discount";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export type SidebarLink = {
  label: string; // i18n key
  path?: string;
  icon?: ElementType;
  children?: SidebarLink[];
};

export const sidebarConfig: SidebarLink[] = [
  {
    label: "dashboard",
    path: "/",
    icon: DashboardIcon,
  },
  {
    label: "catalog",
    icon: CategoryIcon,
    children: [
      { label: "category", path: "/admin/categories", icon: CategoryIcon },
      { label: "brand", path: "/admin/brands", icon: BrandingWatermarkIcon },
    ],
  },
  {
    label: "products",
    icon: CategoryIcon,
    children: [
      { label: "productsList", path: "products" },
      {
        label: "createProduct",
        path: "products/create",
      },
    ],
  },
  {
    label: "financialOperations",
    icon: MonetizationOnOutlinedIcon,
    children: [
      { label: "collections", path: "collections" },
      { label: "payments", path: "payments" },
      { label: "invoices", path: "invoices" },
    ],
  },

  {
    label: "branches",
    path: "/branches",
    icon: Store,
  },
  {
    label: "coupons",
    path: "/coupons",
    icon: DiscountIcon,
  },
  {
    label: "carts",
    path: "/carts",
    icon: ShoppingCartIcon,
  },
  {
    label: "securitySettings",
    icon: Security,
    children: [
      { label: "roles", path: "roles" },
      { label: "permissions", path: "permissions" },
    ],
  },
  {
    label: "users",
    icon: GroupIcon,
    children: [
      { label: "usersList", path: "users" },
      { label: "createUser", path: "/users/create" },
    ],
  },
  {
    label: "employees",
    icon: GroupIcon,
    children: [
      { label: "employeesList", path: "employees" },
      { label: "employeesCreate", path: "/employees/create" },
    ],
  },
];
