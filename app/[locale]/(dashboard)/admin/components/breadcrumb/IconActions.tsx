// components/breadcrumbs/IconActions.tsx
import React, { useState, useCallback, useMemo } from "react";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { type PageIconAction } from "./index";

interface IconActionsProps {
  icons: PageIconAction[];
}

// Memoized IconButton component
const IconActionButton = React.memo<{
  icon: PageIconAction;
}>(({ icon }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!icon.disabled && icon.onClick) {
        icon.onClick();
      }
    },
    [icon]
  );

  return (
    <Tooltip title={icon.label ?? ""}>
      <span>
        <IconButton
          onClick={handleClick}
          color="primary"
          disabled={icon.disabled}
          aria-label={icon.label}
        >
          {icon.component}
        </IconButton>
      </span>
    </Tooltip>
  );
});

IconActionButton.displayName = "IconActionButton";

const IconActions: React.FC<IconActionsProps> = ({ icons }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMenuItemClick = useCallback(
    (icon: PageIconAction) => {
      if (!icon.disabled && icon.onClick) {
        icon.onClick();
      }
      handleMenuClose();
    },
    [handleMenuClose]
  );

  const MAX_VISIBLE_ICONS = 2;

  // Split icons: first 2 visible, rest in menu
  const { visibleIcons, menuIcons } = useMemo(() => {
    if (icons.length <= MAX_VISIBLE_ICONS) {
      return { visibleIcons: icons, menuIcons: [] };
    }
    return {
      visibleIcons: icons.slice(0, MAX_VISIBLE_ICONS),
      menuIcons: icons.slice(MAX_VISIBLE_ICONS),
    };
  }, [icons]);

  const hasMenuIcons = menuIcons.length > 0;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {/* Always render visible icons as IconButtons */}
      {visibleIcons.map((icon, idx) => (
        <IconActionButton key={`visible-${idx}`} icon={icon} />
      ))}

      {/* Render 3 dots menu if there are more than 2 icons */}
      {hasMenuIcons && (
        <>
          <IconButton
            onClick={handleMenuOpen}
            color="primary"
            aria-label="more actions"
            aria-controls={open ? "icon-actions-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="icon-actions-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                minWidth: 180,
              },
            }}
          >
            {menuIcons.map((icon, idx) => (
              <MenuItem
                key={`menu-${idx}`}
                onClick={() => handleMenuItemClick(icon)}
                disabled={icon.disabled}
              >
                <ListItemIcon>{icon.component}</ListItemIcon>
                <ListItemText>{icon.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Stack>
  );
};

export default React.memo(IconActions);
