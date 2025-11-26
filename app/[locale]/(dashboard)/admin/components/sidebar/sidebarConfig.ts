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
    label: "contactRequests",
    path: "/admin/contact-requests",
    icon: GroupIcon, // Using GroupIcon temporarily, ideally MessageIcon
  },
  {
    label: "expenses",
    path: "/admin/expenses",
    icon: MonetizationOnOutlinedIcon,
  },
  {
    label: "users", // Admin users
    path: "/admin/users",
    icon: GroupIcon,
  },
  {
    label: "securitySettings",
    icon: Security,
    children: [
      { label: "roles", path: "roles" },
      { label: "permissions", path: "permissions" },
    ],
  },
];
