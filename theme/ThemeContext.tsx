import { createContext, useContext } from "react";

export type Mode = "light" | "dark";

export type ThemeContextType = {
  mode: Mode;
  toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeMode must be used inside ThemeProvider");
  return context;
};
