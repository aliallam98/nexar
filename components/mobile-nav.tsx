"use client";
import Link from "next/link";

import { cn } from "../lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface MobileNavProps {
  routes: {
    href: string;
    label: string;
    active: boolean;
    hasChildren?: boolean;
  }[];
}

// Mock data - in a real app, this would come from Shopify API
const subcategories = {
  "/collections": [
    { id: "women", name: "Women", href: "/collections/women" },
    { id: "men", name: "Men", href: "/collections/men" },
    {
      id: "accessories",
      name: "Accessories",
      href: "/collections/accessories",
    },
    { id: "sale", name: "Sale", href: "/collections/sale" },
  ],
};

export function MobileNav({ routes }: MobileNavProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-bold text-xl">LUXE</span>
      </Link>
      <div className="flex flex-col gap-2">
        {routes.map((route) =>
          route.hasChildren ? (
            <Accordion
              key={route.href}
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value="categories" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      route.active ? "text-primary" : "text-foreground"
                    )}
                  >
                    {route.label}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 pl-4">
                    {subcategories[route.href]?.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={subcategory.href}
                        className="py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "py-2 text-sm font-medium",
                route.active ? "text-primary" : "text-foreground"
              )}
            >
              {route.label}
            </Link>
          )
        )}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Link href="/account/login" className="py-2 text-sm font-medium">
          Sign In
        </Link>
        <Link href="/account/register" className="py-2 text-sm font-medium">
          Create Account
        </Link>
      </div>
    </div>
  );
}
