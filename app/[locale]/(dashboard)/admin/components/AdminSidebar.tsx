"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tag,
  Layers,
  Ticket,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../../../../../lib/utils";
import { useTranslation } from "react-i18next";

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, href: "/admin" },
  { id: "products", icon: Package, href: "/admin/products" },
  { id: "categories", icon: Layers, href: "/admin/categories" },
  { id: "brands", icon: Tag, href: "/admin/brands" },
  { id: "coupons", icon: Ticket, href: "/admin/coupons" },
  { id: "orders", icon: ShoppingCart, href: "/admin/orders" },
  { id: "settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
  const { t } = useTranslation("admin");
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return (
        pathname === `/${"locale"}/admin` || pathname === `/${"locale"}/admin/`
      );
    }
    return pathname.includes(href);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = `/${"locale"}/login`;
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen overflow-y-auto">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href={`/${"locale"}/admin`}>
          <h1 className="text-2xl font-bold text-sidebar-primary">Admin</h1>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={`/${"locale"}${item.href}`}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{t(item.id)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {t("logout")}
        </Button>
      </div>
    </aside>
  );
}
