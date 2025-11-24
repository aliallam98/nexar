"use client";

import {
  List,
  ListItem,
  ListItemButton,
  Collapse,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import type { SidebarLink } from "./sidebarConfig";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  item: SidebarLink;
  depth?: number;
  onClose?: () => void;
};

const ICON_FONT_SIZE = 20;
const PARENT_FONT_SIZE = 13;
const CHILD_FONT_SIZE = 12;

export default function SidebarItem({ item, onClose }: Props) {
  const { t } = useTranslation(["sidebar"]);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const hasChildren = !!item.children?.length;
  const isActive = pathname === item.path;
  const isChildActive = item.children?.some((child) => pathname === child.path);

  useEffect(() => {
    if (isChildActive) {
      setOpen(true);
    }
  }, [isChildActive]);

  const handleClose = () => {
    if (isMobile && onClose) onClose();
  };

  const handleToggle = () => {
    if (hasChildren) setOpen((prev) => !prev);
    if (!hasChildren) handleClose();
  };

  const renderIcon = () =>
    item.icon ? (
      <item.icon
        className={hasChildren ? "parent-icon" : "child-icon"}
        style={{ fontSize: ICON_FONT_SIZE, color: "inherit" }}
      />
    ) : null;

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          component={hasChildren ? "div" : Link}
          href={hasChildren ? undefined : item.path || "#"}
          onClick={handleToggle}
          sx={{
            px: 2,
            py: 1.5,
            justifyContent: "space-between",
            ...(isActive && {
              "& .sidebar-text": {
                color: "primary.main",
                fontWeight: 600,
              },
              "& .child-stack": {
                color: "primary.main",
              },
            }),
            "&:hover .child-icon, &:hover .child-text": {
              color: "primary.main",
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            flexGrow={1}
            className="child-stack child-icon"
          >
            {renderIcon()}
            <Typography
              fontSize={hasChildren ? PARENT_FONT_SIZE : CHILD_FONT_SIZE}
              className="sidebar-text child-text"
              color={
                isActive || isChildActive ? "primary.main" : "text.primary"
              }
            >
              {t(item.label)}
            </Typography>
          </Stack>
          {hasChildren &&
            (open ? (
              <ExpandLess fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            ))}
        </ListItemButton>
      </ListItem>

      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item?.children?.map((child) => {
              const isChildSelected = pathname === child.path;

              return (
                <ListItemButton
                  key={child.path || child.label}
                  component={Link}
                  href={child.path!}
                  onClick={handleClose}
                  sx={{
                    pl: 4,
                    ...(isChildSelected && {
                      "& .child-stack": {
                        color: "primary.main",
                      },
                    }),
                    "&:hover .child-icon, &:hover .child-text": {
                      color: "primary.main",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    className="child-stack"
                    color={isChildSelected ? "primary.main" : "text.primary"}
                  >
                    <RemoveIcon className="child-icon" />
                    <Typography
                      fontSize={CHILD_FONT_SIZE}
                      className="child-text"
                      color="inherit"
                    >
                      {t(child.label)}
                    </Typography>
                  </Stack>
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}
