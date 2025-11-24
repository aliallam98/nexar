// src/components/navbar/ThemeSwitcher.tsx
import { useContext } from "react";
import { Switch, styled, useColorScheme } from "@mui/material";
import { useThemeMode } from "../../../../../../theme/ThemeContext";

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(24px)",
      color: "#fff",
      "& .MuiSwitch-thumb:before": {
        content: '"🌙"',
      },
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#666" : "#bbb",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#222" : "#fff",
    width: 22,
    height: 22,
    margin: 1,
    "&:before": {
      content: '"☀️"',
      display: "block",
      width: "100%",
      height: "100%",
      fontSize: 12,
      lineHeight: "22px",
      textAlign: "center",
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 13,
    backgroundColor: theme.palette.mode === "dark" ? "#555" : "#ccc",
    opacity: 1,
    border: "1px solid transparent",
    transition: theme.transitions.create(["background-color", "border"], {
      duration: 300,
    }),
  },
  "&:hover .MuiSwitch-track": {
    backgroundColor: theme.palette.mode === "dark" ? "#666" : "#bbb",
    border: `1px solid ${theme.palette.primary.main}`,
    transition: theme.transitions.create(["background-color", "border"], {
      duration: 300,
    }),
  },
}));

export default function ThemeSwitcher() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <ThemeSwitch
      checked={mode === "dark"}
      onChange={toggleMode}
      inputProps={{ "aria-label": "theme toggle" }}
    />
  );
}
