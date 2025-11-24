"use client";
import { AppBar, Stack, Toolbar, useTheme } from "@mui/material";
import SidebarToggle from "./SidebarToggle";
import Logo from "./Logo";
import AccountMenu from "./AccountMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";

type Props = {
  onDrawerToggle: () => void;
};

export default function AdminNavbar({ onDrawerToggle }: Props) {
  const theme = useTheme();

  return (
    <AppBar
      position="relative"
      elevation={1}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        component={Stack}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <SidebarToggle onClick={onDrawerToggle} />
          <Logo />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <LangSwitcher />
          <ThemeSwitcher />

          <AccountMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
