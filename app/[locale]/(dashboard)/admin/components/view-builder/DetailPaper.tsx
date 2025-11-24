import Grid, { Grid2Props } from "@mui/material/Grid2";
import { FC } from "react";
import { DataMapItem } from "./ViewPageBuilder";
import TextKeyValue from "../TextKeyValue";
import { StyledLink } from "../../../global.style";

export interface DetailCardProps {
  dataMap: DataMapItem[];
  isLoading?: boolean;
  title?: string;
  defaultItemSize?: Grid2Props["size"];
}

/**
 * A reusable component for displaying key-value data entries in a card layout
 */
export const DetailPaper: FC<DetailCardProps> = ({
  dataMap,
  isLoading = false,
  title,
  defaultItemSize = { xs: 12, sm: 6, md: 4, lg: 3 },
}) => {
  return (
    <>
      {dataMap.map((item, idx) => {
        const sizeProp = item.size || defaultItemSize;
        return (
          <Grid key={idx} size={sizeProp}>
            <TextKeyValue
              title={item.title}
              value={item.value}
              loading={isLoading}
            >
              {item.pathname && (
                <StyledLink to={item.pathname}>{item.value}</StyledLink>
              )}
            </TextKeyValue>
          </Grid>
        );
      })}
    </>
  );
};
