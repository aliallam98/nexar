// DataSection.tsx
import { type FC } from "react";
import type { DataItem } from "./ViewPageBuilder";
import { Grid, Typography, type GridProps } from "@mui/material";
import { DataItemDisplay } from "./DataItemDisplay";

export interface DataSectionProps {
  title: string;
  dataItems: DataItem[];
  isLoading?: boolean;
  defaultItemSize?: GridProps["size"];
}

/**
 * A section component that displays a title and a grid of data items
 * Handles the layout and rendering of individual data items within a section
 */
export const DataSection: FC<DataSectionProps> = ({
  title,
  dataItems,
  isLoading = false,
  defaultItemSize = { xs: 12, sm: 6, md: 4, lg: 3 },
}) => {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
      </Grid>
      {dataItems.map((item, index) => {
        const itemSize = item.size || defaultItemSize;
        return (
          <Grid key={`${title}-item-${index}-${item.title}`} size={itemSize}>
            <DataItemDisplay item={item} isLoading={isLoading} />
          </Grid>
        );
      })}
    </>
  );
};
