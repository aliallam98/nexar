import { Grid, Paper, Stack, type GridProps } from "@mui/material";
import type { FC, ReactNode } from "react";
import { DataSection } from "./DataSection";

export interface DataItem {
  title: string;
  value: ReactNode;
  pathname?: string;
  size?: GridProps["size"];
  asLink?: boolean;
}

export interface ViewPageSection {
  title: string;
  dataItems: DataItem[];
}

export interface ViewPageBuilderProps {
  sections: ViewPageSection[];
  isLoading?: boolean;
  padding?: number;
  spacing?: number;
  borderRadius?: number;
  defaultItemSize?: GridProps["size"];
}

/**
 * A component that builds a complete view page with multiple detail sections
 * Each section is rendered as a separate paper container with its own grid layout
 */
export const ViewPageBuilder: FC<ViewPageBuilderProps> = ({
  sections,
  isLoading = false,
  padding = 2,
  spacing = 1,
  borderRadius = 1,
  defaultItemSize = { xs: 12, sm: 6, md: 4, lg: 3 },
}) => {
  return (
    <Stack spacing={2}>
      {sections.map((section, index) => (
        <Paper
          key={`section-${index}-${section.title}`}
          sx={{
            padding,
            borderRadius,
          }}
        >
          <Grid container spacing={spacing}>
            <DataSection
              title={section.title}
              dataItems={section.dataItems}
              isLoading={isLoading}
              defaultItemSize={defaultItemSize}
            />
          </Grid>
        </Paper>
      ))}
    </Stack>
  );
};

// Example usage:
/*
const sections: SectionData[] = [
  {
    title: "Personal Information",
    dataItems: [
      { title: "user.name", value: "John Doe" },
      { title: "user.email", value: "john@example.com", pathname: "/profile" },
      { title: "user.phone", value: "+1234567890", size: { xs: 12, sm: 6 } },
    ]
  },
  {
    title: "Account Details",
    dataItems: [
      { title: "account.id", value: "12345" },
      { title: "account.status", value: "Active" },
      { title: "account.created", value: "2024-01-15" },
    ]
  }
];

<ViewPageBuilder 
  sections={sections} 
  isLoading={false}
  padding={3}
  spacing={2}
  borderRadius={2}
/>
*/
