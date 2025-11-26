import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useRouter } from "next/navigation";

export const useExpenseListBreadcrumbIcons = () => {
  const router = useRouter();

  return {
    dashboard: <DashboardIcon sx={{ fontSize: "1.2rem" }} />,
    expenses: <ReceiptIcon sx={{ fontSize: "1.2rem" }} />,
    add: <AddIcon sx={{ fontSize: "1.2rem" }} />,
    actions: {
      add: () => router.push("/admin/expenses/create"),
    },
  };
};
