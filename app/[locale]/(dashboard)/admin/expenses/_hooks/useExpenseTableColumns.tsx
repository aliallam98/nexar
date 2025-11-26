import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { format } from "date-fns";

export const useExpenseTableColumns = () => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "expenseDate",
        header: "Date",
        cell: ({ getValue }) => {
          const date = getValue() as string;
          return (
            <Typography variant="body2">
              {format(new Date(parseInt(date)), "MMM d, yyyy")}
            </Typography>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => (
          <Typography variant="body2" fontWeight="medium">
            {getValue() as string}
          </Typography>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => (
          <Typography variant="body2" fontWeight="bold">
            ${(getValue() as number).toFixed(2)}
          </Typography>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <Chip
            label={row.original.category?.name || "Uncategorized"}
            size="small"
            variant="outlined"
          />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue() as string;
          let color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" = "default";
          
          switch (status) {
            case "APPROVED":
              color = "success";
              break;
            case "PENDING_EDIT":
              color = "warning";
              break;
            case "REJECTED_EDIT":
              color = "error";
              break;
          }

          return (
            <Chip
              label={status.replace("_", " ")}
              color={color}
              size="small"
            />
          );
        },
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        cell: ({ row }) => (
          <Typography variant="caption" color="text.secondary">
            {row.original.createdBy?.name}
          </Typography>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <Link href={`/admin/expenses/${row.original.id}`} passHref>
              <IconButton size="small" color="primary">
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
          </Stack>
        ),
      },
    ],
    []
  );

  return columns;
};
