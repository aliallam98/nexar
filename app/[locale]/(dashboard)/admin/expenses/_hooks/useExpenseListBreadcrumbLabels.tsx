import { useTranslation } from "react-i18next";

export const useExpenseListBreadcrumbLabels = () => {
  const { t } = useTranslation(["breadcrumb"]);

  return {
    dashboard: t("dashboard"),
    expenses: "Expenses",
  };
};
