import { format } from "date-fns";
import Link from "next/link";
import { Chip, IconButton, Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const useContactRequestTableColumns = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "default";
      case "IN_PROGRESS":
        return "primary";
      case "RESOLVED":
        return "success";
      case "ARCHIVED":
        return "error";
      default:
        return "default";
    }
  };

  const columns = [
    {
      id: "createdAt",
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }: any) => {
        const createdAt = row.original.createdAt;
        return (
          <Typography variant="body2">
            {format(new Date(parseInt(createdAt)), "MMM d, yyyy")}
          </Typography>
        );
      },
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: any) => {
        const name = row.original.name;
        const phone = row.original.phone;
        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body2" fontWeight="medium">
              {name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {phone}
            </Typography>
          </Box>
        );
      },
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      cell: ({ row }: any) => (
        <Typography variant="body2">{row.original.category}</Typography>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => (
        <Chip
          label={row.original.status.replace("_", " ")}
          color={getStatusColor(row.original.status) as any}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      id: "assignedTo",
      header: "Assigned To",
      accessorKey: "assignedTo",
      cell: ({ row }: any) => {
        const assignedTo = row.original.assignedTo;
        return assignedTo ? (
          <Typography variant="body2">{assignedTo.name}</Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            -
          </Typography>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <Link href={`/admin/contact-requests/${row.original.id}`} passHref>
          <IconButton size="small" color="primary">
            <VisibilityIcon />
          </IconButton>
        </Link>
      ),
    },
  ];

  return columns;
};
