"use client";

import {
  Drawer,
  Toolbar,
  List,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SidebarItem from "./SidebarItem";
import { sidebarConfig } from "./sidebarConfig";

const drawerWidth = 240;

type SidebarProps = {
  open: boolean;
  onClose?: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor={isMobile ? "bottom" : "left"}
      open={open}
      onClose={onClose}
      // ModalProps={{ keepMounted: true }}
      sx={{
        flexShrink: 0,
        zIndex: theme.zIndex.appBar - 1,
        "& .MuiDrawer-paper": {
          width: isMobile ? "100%" : drawerWidth,
          height: "100%",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflowY: "auto" }}>
        <List>
          {sidebarConfig.map((item, index) => (
            <SidebarItem key={index} item={item} onClose={onClose} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
