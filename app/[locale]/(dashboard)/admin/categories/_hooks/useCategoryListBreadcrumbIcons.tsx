import { Plus } from "lucide-react";
import { PageIconAction } from "../../components/breadcrumb";
import { redirect } from "next/navigation";

export const useCategoryListBreadcrumbIcons = () => {
  const icons: PageIconAction[] = [
    {
      id: "save",
      label: "add",
      component: <Plus />,
      onClick: () => redirect("/admin/categories/create"),
      disabled: false,
    },
  ];
  return icons;
};
