// i18n/LanguageProvider.tsx
"use client";

import { I18nextProvider } from "react-i18next";
import { createInstance, Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { useEffect } from "react";
import Cookies from "js-cookie";

const LANGUAGE_COOKIE_KEY = "lang";

interface LanguageProviderProps {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource;
}

/**
 * Language Provider for Next.js App Router
 * Synchronizes server-rendered locale with client-side i18n
 *
 * @param props - Provider props
 * @param props.children - Child components
 * @param props.locale - Current locale from server
 * @param props.namespaces - Translation namespaces to load
 * @param props.resources - Translation resources
 */
export default function LanguageProvider({
  children,
  locale,
  namespaces,
  resources,
}: LanguageProviderProps) {
  // Create a new i18n instance for this component tree
  const i18n = createInstance();

  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: "en",
    resources,
    ns: namespaces,
    defaultNS: namespaces[0],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  // Sync language with cookies
  useEffect(() => {
    // Update cookie when locale changes
    Cookies.set(LANGUAGE_COOKIE_KEY, locale, {
      expires: 365,
      path: "/",
      sameSite: "strict",
    });

    // Update HTML attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
// import { useEffect } from "react";
// import { useTranslation } from "react-i18next";

// export default function LanguageProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { i18n } = useTranslation();

//   useEffect(() => {
//     const lang = localStorage.getItem("lang") || "en";
//     i18n.changeLanguage(lang);
//     document.documentElement.lang = lang;
//     document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
//   }, [i18n]);

//   return <>{children}</>;
// }
