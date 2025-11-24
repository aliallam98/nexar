import * as React from "react";
import {
  Drawer,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

interface FiltersContainerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function FiltersContainer({
  open,
  onClose,
  children,
}: FiltersContainerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor={isMobile ? "bottom" : "left"}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobile ? "100%" : drawerWidth,
          height: isMobile ? "auto" : "100%",
          maxHeight: "80%",
          boxSizing: "border-box",
        },
      }}
    >
      {!isMobile && <Toolbar />}
      <Box sx={{ overflowY: "auto", p: isMobile ? 2 : 0 }}>
        {isMobile && (
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Filters
          </Typography>
        )}
        {children}
      </Box>
    </Drawer>
  );
}

interface FilterablePageLayoutProps {
  filtersOpen: boolean;
  onFiltersClose: () => void;
  filters: React.ReactNode;
  children: React.ReactNode;
}

export function FilterablePageLayout({
  filtersOpen,
  onFiltersClose,
  filters,
  children,
}: FilterablePageLayoutProps) {
  return (
    <>
      <FiltersContainer open={filtersOpen} onClose={onFiltersClose}>
        {filters}
      </FiltersContainer>

      <Box
        sx={{
          marginLeft: { xs: 0, sm: filtersOpen ? `${drawerWidth}px` : 0 },
          transition: "margin 0.3s ease",
        }}
      >
        {children}
      </Box>
    </>
  );
}
