import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useContactRequestListBreadcrumbLabels = () => {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      dashboard: t("dashboard"),
      contactRequests: t("contactRequests"),
    }),
    [t]
  );
};
