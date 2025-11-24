//
import { Skeleton, styled, Typography } from "@mui/material";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { DataItem } from "./ViewPageBuilder";
import { StyledLink } from "../StyledLink";

const DataItemContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "72px", // Ensures consistent height
  padding: theme.spacing(1),
}));

const DataItemLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 1.2,
}));

const DataItemContent = styled("div")({
  minHeight: "24px",
  display: "flex",
  alignItems: "center",
  flex: 1,
});

export interface DataItemDisplayProps {
  item: DataItem;
  isLoading: boolean;
}

/**
 * A component for displaying a single data item with label and value
 * Supports loading states, clickable links, and fallback placeholder text
 */
export const DataItemDisplay: FC<DataItemDisplayProps> = ({
  item,
  isLoading,
}) => {
  const { t } = useTranslation();
  const { title, value, pathname } = item;

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton width="100%" height={24} />;
    }

    if (pathname && value) {
      return (
        <StyledLink to={pathname} aria-label={`Navigate to ${title}`}>
          <Typography variant="body2" component="span">
            {value}
          </Typography>
        </StyledLink>
      );
    }

    return (
      <Typography
        variant="body2"
        color={value ? "text.primary" : "text.secondary"}
      >
        {value || t("common.noData", "No data available")}
      </Typography>
    );
  };

  return (
    <DataItemContainer>
      <DataItemLabel variant="body2">{t(title)}</DataItemLabel>
      <DataItemContent>{renderContent()}</DataItemContent>
    </DataItemContainer>
  );
};
