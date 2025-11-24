// Update your ViewDropdown component to accept props:
import { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type ViewDropdownProps = {
  onViewChange: (view: "grid" | "list") => void;
  currentView: "grid" | "list";
};

export function ViewDropdown({ onViewChange, currentView }: ViewDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (selected: "list" | "grid") => {
    onViewChange(selected); // Use the prop function instead of local state
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        size="small"
        sx={{
          border: "1px solid",
          height: 35,
          width: 50,
        }}
      >
        {currentView === "list" ? <ViewListIcon /> : <GridViewIcon />}
        <ArrowDropDownIcon />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          selected={currentView === "list"}
          onClick={() => handleSelect("list")}
        >
          <ListItemIcon>
            <ViewListIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="List view" />
        </MenuItem>

        <MenuItem
          selected={currentView === "grid"}
          onClick={() => handleSelect("grid")}
        >
          <ListItemIcon>
            <GridViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Grid view" />
        </MenuItem>
      </Menu>
    </>
  );
}
