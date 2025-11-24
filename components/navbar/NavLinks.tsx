import { IRoute, marketingNavLinks } from "@/constants/marketing-links";
import { NavLink } from "./NavLink";
import { memo } from "react";

/**
 * Navigation Links Component - Renders main navigation menu items
 * @returns JSX.Element - Horizontal navigation menu for desktop
 */
export const NavLinks = memo(() => {
  return (
    <nav
      className="relative hidden md:flex items-center space-x-6 lg:space-x-8"
      role="navigation"
      aria-label="Main navigation"
    >
      {marketingNavLinks.map((route: IRoute) => (
        <div key={route.href} className="relative group">
          <NavLink route={route} />
        </div>
      ))}
    </nav>
  );
});


