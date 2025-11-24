import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";

export const useCustomerTableColumns = () => {
  const columns = [
    {
      id: "image",
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: any) => {
        const image = row.original.image;
        const name = row.original.name || row.original.email;

        return (
          <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
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
      id: "name",
      header: "Customer",
      accessorKey: "name",
      cell: ({ row }: any) => {
        const name = row.original.name;
        const email = row.original.email;
        const id = row.original.id;

        return (
          <div className="flex flex-col">
            <Link
              href={`/admin/customers/${id}`}
              className="font-medium hover:underline text-primary"
            >
              {name || "No name"}
            </Link>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{email}</span>
            </div>
          </div>
        );
      },
    },
    {
      id: "phone",
      header: "Phone",
      accessorKey: "phone",
      cell: ({ row }: any) => {
        const phone = row.original.phone;

        if (!phone) {
          return <span className="text-muted-foreground">-</span>;
        }

        return (
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span>{phone}</span>
          </div>
        );
      },
    },
    {
      id: "isActive",
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }: any) => {
        const isActive = row.original.isActive;

        return (
          <div className="flex items-center gap-2">
            {isActive ? (
              <Badge variant="default" className="bg-green-600">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Active
              </Badge>
            ) : (
              <Badge variant="secondary">
                <XCircle className="h-3 w-3 mr-1" />
                Inactive
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "createdAt",
      header: "Joined",
      accessorKey: "createdAt",
      cell: ({ row }: any) => {
        const createdAt = row.original.createdAt;

        try {
          const timestamp =
            typeof createdAt === "string" ? parseInt(createdAt) : createdAt;

          const date = new Date(timestamp);

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
