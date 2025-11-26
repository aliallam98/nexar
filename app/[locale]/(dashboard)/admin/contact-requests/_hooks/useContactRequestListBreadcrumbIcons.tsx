import { useMemo } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";

export const useContactRequestListBreadcrumbIcons = () => {
  return useMemo(
    () => ({
      dashboard: <DashboardIcon sx={{ fontSize: 16 }} />,
      contactRequests: <GroupIcon sx={{ fontSize: 16 }} />,
    }),
    []
  );
};
