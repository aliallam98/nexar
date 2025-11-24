"use client";
import { ReactNode, useState } from "react";
import AdminNavbar from "./navbar/Navbar";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import Footer from "./footer/Footer";
import Sidebar from "./sidebar/Sidebar";

const drawerWidth = 240;

export const AdminLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      {/* <CssBaseline /> */}
      <AdminNavbar onDrawerToggle={handleDrawerToggle} />

      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar open={isSidebarOpen} onClose={handleDrawerToggle} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: theme.transitions.create(
              ["margin-inline-start", "margin-inline-end"],
              {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
              }
            ),
            marginInlineStart: isMobile
              ? 0
              : `${isSidebarOpen ? drawerWidth : 0}px`,
            px: 3,
            py: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.default",
          }}
        >
          <Box
            component={"section"}
            sx={{ flexGrow: 1 }}
            height={"100%"}
            width={"100%"}
          >
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};
