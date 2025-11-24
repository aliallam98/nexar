import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export const useCategoryTableColumns = () => {
  const columns = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => {
        const name = row.original.name;
        const slug = row.original.slug;
        const id = row.original.id;

        return (
          <div className="flex flex-col">
            <Link
              href={`/admin/categories/${id}`}
              className="font-medium hover:underline text-primary"
            >
              {name}
            </Link>
            <span className="text-xs text-muted-foreground">{slug}</span>
          </div>
        );
      },
    },
    {
      id: "image",
      header: "Image",
      accessorKey: "image",
      cell: ({ row }) => {
        const image = row.original.image;
        const name = row.original.name;

        return (
          <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-muted-foreground">
                {name?.charAt(0)?.toUpperCase() || "?"}
              </span>
            )}
          </div>
        );
      },
    },

    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => {
        const description = row.original.description;

        if (!description) {
          return <span className="text-muted-foreground">-</span>;
        }

        return (
          <div className="max-w-md truncate" title={description}>
            {description}
          </div>
        );
      },
    },
    {
      id: "isActive",
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }) => {
        const isActive = row.original.isActive;

        return (
          <div className="flex items-center gap-2">
            {isActive ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
              </>
            )}
          </div>
        );
      },
    },
    {
      id: "createdAt",
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;

        try {
          // Parse timestamp (could be string or number)
          const timestamp =
            typeof createdAt === "string" ? parseInt(createdAt) : createdAt;

          const date = new Date(timestamp);

          // Format: "Jan 15, 2024"
          return (
            <div className="flex flex-col">
              <span className="text-sm">{format(date, "MMM dd, yyyy")}</span>
              <span className="text-xs text-muted-foreground">
                {format(date, "HH:mm")}
              </span>
            </div>
          );
        } catch (error) {
          return <span className="text-muted-foreground">Invalid date</span>;
        }
      },
    },
  ];

  return columns;
};
