import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageIconAction } from "../../components/breadcrumb";

export const useCustomerListBreadcrumbIcons = () => {
  const router = useRouter();

  const icons: PageIconAction[] = [
    {
      id: "create",
      label: "add",
      component: <Plus />,
      onClick: () => router.push("/admin/customers/create"),
      disabled: false,
    },
  ];

  return icons;
};
