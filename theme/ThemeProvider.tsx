"use client";

import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { getTheme } from "./theme";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie"; // ✅ client-side cookie library
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const [mode, setMode] = useState<"light" | "dark">("light");

  // Apply <html> lang and direction
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = direction;
  }, [i18n.language, direction]);

  // Initialize theme mode from cookie or system preference
  useEffect(() => {
    const stored = Cookies.get("theme");
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initial = prefersDark ? "dark" : "light";
      setMode(initial);
      Cookies.set("theme", initial, { expires: 365 });
    }
  }, []);

  // Toggle and persist in cookies
  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      Cookies.set("theme", next, { expires: 365 });
      return next;
    });
  };

  // Generate MUI theme + Emotion cache
  const theme = useMemo(() => getTheme(mode, direction), [mode, direction]);

  const cache = useMemo(
    () =>
      createCache({
        key: direction === "rtl" ? "mui-rtl" : "mui",
        stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
      }),
    [direction]
  );

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <ThemeContext.Provider value={{ mode, toggleMode }}>
          {children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    </CacheProvider>
  );
};
