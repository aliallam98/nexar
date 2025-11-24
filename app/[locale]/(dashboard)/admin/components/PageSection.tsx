import { Box, Stack } from "@mui/material";
import React from "react";
import Breadcrumb, { BreadcrumbsComponentProps } from "./breadcrumb";

interface IProps extends BreadcrumbsComponentProps {
  children: React.ReactNode;
}

export default function PageSection({
  children,
  breadcrumbs,
  icons,
  isLoading,
}: IProps) {
  return (
    <Stack component={"section"} height={"100%"} spacing={2}>
      <Breadcrumb
        breadcrumbs={breadcrumbs}
        icons={icons}
        isLoading={isLoading}
      />
      {children}
    </Stack>
  );
}
