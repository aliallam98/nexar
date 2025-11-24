"use client";
import React, { useMemo, ReactNode } from "react";
import { Breadcrumbs, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import LinkRouter from "./LinkRouter";
import IconActions from "./IconActions";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  to?: string;
  disableLink?: boolean;
}

export interface PageIconAction {
  id: string;
  component: ReactNode;
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface BreadcrumbsComponentProps {
  breadcrumbs?: BreadcrumbItem[];
  icons?: PageIconAction[];
  isLoading?: boolean;
}

// Separate component for individual breadcrumb to optimize re-renders
const BreadcrumbText = React.memo<{ label: string; color: string }>(
  ({ label, color }) => {
    const { t } = useTranslation(["breadcrumb"]);
    return (
      <Typography sx={{ fontSize: "0.9rem", color }} aria-current="page">
        {t(label)}
      </Typography>
    );
  }
);

BreadcrumbText.displayName = "BreadcrumbText";

const BreadcrumbsComponent: React.FC<BreadcrumbsComponentProps> = ({
  breadcrumbs = [],
  icons = [],
  isLoading = false,
}) => {
  const { t } = useTranslation(["breadcrumb"]);
  const pathname = usePathname();
  const theme = useTheme();

  const isHomePage = pathname === "/admin";
  const textColor = theme.palette.text.primary;

  const breadcrumbItems = useMemo(() => {
    if (breadcrumbs.length === 0) {
      return [<BreadcrumbText key="home" label="home" color={textColor} />];
    }

    return [
      <LinkRouter key="home" to="/admin" disabled={isLoading}>
        {t("home")}
      </LinkRouter>,
      ...breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return isLast || crumb.disableLink ? (
          <BreadcrumbText
            key={crumb.label + index}
            label={crumb.label}
            color={textColor}
          />
        ) : (
          <LinkRouter
            key={crumb.label + index}
            to={crumb.to ?? "#"}
            disabled={isLoading}
          >
            {t(crumb.label)}
          </LinkRouter>
        );
      }),
    ];
  }, [breadcrumbs, t, textColor, isLoading]);

  // Early return for homepage
  if (isHomePage) return null;

  const hasIcons = icons && icons.length > 0;

  // Disable all icons when loading
  const iconsWithLoadingState = useMemo(
    () =>
      icons.map((icon) => ({
        ...icon,
        disabled: isLoading || icon.disabled,
      })),
    [icons, isLoading]
  );

  return (
    <Stack
      component="section"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      height="auto"
      px={2}
      py={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: textColor,
        // opacity: isLoading ? 0.6 : 1,
        transition: "opacity 0.2s ease-in-out",
        "& .MuiBreadcrumbs-separator": {
          fontSize: "1.4rem",
          marginTop: "-4px",
        },
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" separator="»">
        {breadcrumbItems}
      </Breadcrumbs>

      {hasIcons && <IconActions icons={iconsWithLoadingState} />}
    </Stack>
  );
};

export default React.memo(BreadcrumbsComponent);

// setBreadcrumbs([
//   { label: "dashboard", to: "/app" }, // Custom home
//   { label: "products", to: "/admin/products" },
//   { label: "electronics", to: "/admin/products/electronics" },
//   { label: "laptops", to: "/admin/products/electronics/laptops" },
//   { label: "dell_xps_15" }, // Current page
// ]);

// const canEdit = false; // Example permission

// const icons = [
//   {
//     id: "edit",
//     label: "Edit",
//     component: <EditIcon />,
//     onClick: () => console.log("Edit"),
//     disabled: !canEdit,
//   },
//   {
//     id: "delete",
//     label: "Delete",
//     component: <DeleteIcon />,
//     onClick: () => console.log("Delete"),
//     disabled: false,
//   },
//   {
//     id: "add",
//     label: "Add Note",
//     component: <AddIcon />,
//     onClick: () => console.log("Add"),
//     disabled: false,
//   },
//   {
//     id: "save",
//     label: "Save",
//     component: <SaveIcon />,
//     onClick: () => console.log("Save"),
//     disabled: false,
//   },
//   {
//     id: "share",
//     label: "Share",
//     component: <ShareIcon />,
//     onClick: () => console.log("Share"),
//     disabled: false,
//   }
// ];

// <BreadcrumbsComponent
//   breadcrumbs={breadcrumbs}
//   icons={icons}
//   isLoading={isLoading}
// />;
