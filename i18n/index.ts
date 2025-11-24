// i18n/index.ts or i18n/client.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";
import Cookies from "js-cookie";

/**
 * Cookie key for storing language preference
 */
const LANGUAGE_COOKIE_KEY = "lang";

/**
 * Get initial language from cookies (client-side only)
 * @returns Language code or default "en"
 */
const getInitialLanguage = (): string => {
  // Check if we're on the client side
  if (typeof window !== "undefined") {
    // Try to get from cookie first
    const cookieLang = Cookies.get(LANGUAGE_COOKIE_KEY);
    if (cookieLang) return cookieLang;

    // Fallback to browser language
    const browserLang = navigator.language.split("-")[0];
    if (["en", "ar"].includes(browserLang)) {
      return browserLang;
    }
  }

  // Default fallback
  return "en";
};

/**
 * Initialize i18next for client-side usage
 * Uses cookies instead of localStorage for Next.js compatibility
 */
i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  ns: ["common", "sidebar", "main", "breadcrumb"],
  defaultNS: "main",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Save language preference to cookie whenever it changes
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    Cookies.set(LANGUAGE_COOKIE_KEY, lng, {
      expires: 365, // 1 year
      path: "/",
      sameSite: "strict",
    });
  }
});

export default i18n;
