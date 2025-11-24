import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageIconAction } from "../../components/breadcrumb";

export const useStaffListBreadcrumbIcons = () => {
  const router = useRouter();

  const icons: PageIconAction[] = [
    {
      id: "create",
      label: "add",
      component: <Plus />,
      onClick: () => router.push("/admin/staff/create"),
      disabled: false,
    },
  ];

  return icons;
};
