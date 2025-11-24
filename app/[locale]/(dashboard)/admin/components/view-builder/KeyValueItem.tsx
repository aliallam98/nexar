import { Skeleton, styled, Typography } from "@mui/material";
import { DataMapItem } from "./ViewPageBuilder";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FC } from "react";

const KeyValueContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const KeyValueTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const KeyValueContent = styled("div")({
  minHeight: "24px",
});

/**
 * A reusable component for displaying key-value data entries in a card layout
 */

interface KeyValueItemProps {
  item: DataMapItem;
  isLoading: boolean;
}

/**
 * A component for displaying a single key-value pair
 */
export const KeyValueItem: FC<KeyValueItemProps> = ({ item, isLoading }) => {
  const { t } = useTranslation();
  const { title, value, pathname } = item;

  return (
    <KeyValueContainer>
      <KeyValueTitle variant="body2">{t(title)}</KeyValueTitle>
      <KeyValueContent>
        {isLoading ? (
          <Skeleton width="100%" height={24} />
        ) : pathname ? (
          <Link to={pathname} color="primary">
            {value}
          </Link>
        ) : (
          <Typography variant="body2" color="text.primary">
            {value || t("placeholder")}
          </Typography>
        )}
      </KeyValueContent>
    </KeyValueContainer>
  );
};
