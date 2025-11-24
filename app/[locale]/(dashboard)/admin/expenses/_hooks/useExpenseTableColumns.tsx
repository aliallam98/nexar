import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const useExpenseTableColumns = () => {
  const columns = [
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => {
        const title = row.original.title;
        const id = row.original.id;

        return (
          <Link
            href={`/admin/expenses/${id}`}
            className="font-medium hover:underline text-primary"
          >
            {title}
          </Link>
        );
      },
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => {
        const amount = row.original.amount;
        return (
          <span className="font-semibold">
            ${amount.toFixed(2)}
          </span>
        );
      },
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => {
        const category = row.original.category;
        return (
          <Badge variant="outline">
            {category?.name || "N/A"}
          </Badge>
        );
      },
    },
    {
      id: "expenseDate",
      header: "Expense Date",
      accessorKey: "expenseDate",
      cell: ({ row }) => {
        const expenseDate = row.original.expenseDate;
        try {
          const date = new Date(expenseDate);
          return (
            <span className="text-sm">
              {format(date, "MMM dd, yyyy")}
            </span>
          );
        } catch (error) {
          return <span className="text-muted-foreground">Invalid date</span>;
        }
      },
    },
    {
      id: "createdBy",
      header: "Created By",
      accessorKey: "createdBy",
      cell: ({ row }) => {
        const createdBy = row.original.createdBy;
        return (
          <div className="flex flex-col">
            <span className="text-sm">{createdBy?.name || "Unknown"}</span>
            <span className="text-xs text-muted-foreground">
              {createdBy?.email}
            </span>
          </div>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        
        const statusConfig = {
          APPROVED: { label: "Approved", variant: "default" as const },
          PENDING_EDIT: { label: "Pending Edit", variant: "secondary" as const },
          REJECTED_EDIT: { label: "Rejected", variant: "destructive" as const },
        };

        const config = statusConfig[status] || { label: status, variant: "outline" as const };

        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
  ];

  return columns;
};
