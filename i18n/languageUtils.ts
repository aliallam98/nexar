// i18n/languageUtils.ts
"use client";

import i18n from "./index";
import Cookies from "js-cookie";

/**
 * Cookie key for storing language preference
 */
const LANGUAGE_COOKIE_KEY = "lang";

/**
 * Change application language
 * Updates i18n instance and stores preference in cookies
 *
 * @param lang - Language code ("en" | "ar")
 * @param router - Next.js router instance (optional, for URL updates)
 * @param pathname - Current pathname (optional, for URL updates)
 *
 * @example
 * ```typescript
 * import { changeLanguage } from "@/i18n/languageUtils";
 * import { useRouter, usePathname } from "next/navigation";
 *
 * const router = useRouter();
 * const pathname = usePathname();
 *
 * // Change to Arabic with navigation
 * changeLanguage("ar", router, pathname);
 *
 * // Change to English without navigation (only updates i18n)
 * changeLanguage("en");
 * ```
 */
export const changeLanguage = (
  lang: string,
  router?: any,
  pathname?: string
) => {
  // Change i18n language
  i18n.changeLanguage(lang);

  // Save to cookie
  Cookies.set(LANGUAGE_COOKIE_KEY, lang, {
    expires: 365, // 1 year
    path: "/",
    sameSite: "strict",
  });

  // Update HTML lang and dir attributes
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }

  // Navigate to new locale if router and pathname are provided
  if (router && pathname) {
    const segments = pathname.split("/");
    segments[1] = lang;
    const newPath = segments.join("/");
    router.push(newPath);
    router.refresh();
  }
};

/**
 * Get current language from cookies
 * @returns Current language code
 */
export const getCurrentLanguage = (): string => {
  if (typeof window !== "undefined") {
    return Cookies.get(LANGUAGE_COOKIE_KEY) || "en";
  }
  return "en";
};

/**
 * Check if current language is RTL
 * @returns true if current language is RTL
 */
export const isRTL = (): boolean => {
  const lang = getCurrentLanguage();
  return lang === "ar";
};
