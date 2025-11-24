// Your updated theme.ts
import { createTheme } from "@mui/material";
import type { ThemeOptions } from "@mui/material";

export const getTheme = (mode: "light" | "dark", direction: "ltr" | "rtl") =>
  createTheme({
    direction,

    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#6366f1", // Indigo 500
              light: "#818cf8",
              dark: "#4f46e5",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#10b981", // Emerald 500
              light: "#34d399",
              dark: "#059669",
              contrastText: "#ffffff",
            },
            background: {
              default: "#f9fafb", // Tailwind gray-50
              paper: "#ffffff",
              nestedPaper: "#f3f4f6",
            },
            text: {
              primary: "#1e293b", // slate-800
              secondary: "#475569", // slate-600
            },
            divider: "#e2e8f0", // slate-200
            action: {
              hover: "#f1f5f9", // slate-100
              selected: "#e2e8f0", // slate-200
            },
            error: {
              main: "#ef4444",
              light: "#f87171",
              dark: "#dc2626",
            },
            warning: {
              main: "#f59e0b",
              light: "#fbbf24",
              dark: "#d97706",
            },
            success: {
              main: "#10b981",
              light: "#34d399",
              dark: "#059669",
            },
            info: {
              main: "#3b82f6",
              light: "#60a5fa",
              dark: "#2563eb",
            },
          }
        : {
            primary: {
              main: "#646cff",
              light: "#818cf8",
              dark: "#4f46e5",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#42b883",
              light: "#4ade80",
              dark: "#16a34a",
              contrastText: "#ffffff",
            },
            background: {
              default: "#1b1b1f",
              paper: "#1a1a1a",
              nestedPaper: "#1c1c1c",
            },
            text: {
              primary: "#f1f5f9",
              secondary: "#94a3b8",
            },
            divider: "#2d3748",
            action: {
              hover: "#262626",
              selected: "#374151",
            },
            error: {
              main: "#ef4444",
              light: "#f87171",
              dark: "#dc2626",
            },
            warning: {
              main: "#f59e0b",
              light: "#fbbf24",
              dark: "#d97706",
            },
            success: {
              main: "#10b981",
              light: "#34d399",
              dark: "#059669",
            },
            info: {
              main: "#3b82f6",
              light: "#60a5fa",
              dark: "#2563eb",
            },
          }),
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      // fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
      h1: {
        fontWeight: 800,
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #646cff 0%, #42b883 100%)"
            : "linear-gradient(135deg, #646cff 0%, #42b883 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 500,
          },
          contained: {
            background: "linear-gradient(135deg, #646cff 0%, #42b883 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)",
              boxShadow:
                mode === "dark"
                  ? "0 8px 32px rgba(100, 108, 255, 0.3)"
                  : "0 4px 16px rgba(100, 108, 255, 0.2)",
            },
          },
          outlined: {
            borderColor: "#646cff",
            color: "#646cff",
            "&:hover": {
              borderColor: "#818cf8",
              backgroundColor: "rgba(100, 108, 255, 0.08)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            backgroundImage: "none",
            ...(mode === "dark" && {
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "dark"
                ? "rgba(15, 15, 15, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.08)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "dark" ? "#1a1a1a" : "#f8fafc",
            borderRight:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.08)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background:
              mode === "dark"
                ? "linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(45, 55, 72, 0.3) 100%)"
                : "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.3) 100%)",
            backdropFilter: "blur(10px)",
            border:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.08)",
            "&:hover": {
              border: "1px solid rgba(100, 108, 255, 0.3)",
              transform: "translateY(-2px)",
              transition: "all 0.3s ease",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(100, 108, 255, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#646cff",
              },
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "rgba(100, 108, 255, 0.08)",
              borderRadius: "8px",
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "rgba(100, 108, 255, 0.08)",
            },
            "&.Mui-selected": {
              backgroundColor: "rgba(100, 108, 255, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(100, 108, 255, 0.2)",
              },
            },
          },
        },
      },
    },
  } satisfies ThemeOptions);
