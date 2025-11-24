"use client";

import { useUserQuery } from "@/graphql/queries/user/user.generated";
import { FullScreenLoading } from "../../components/FullScreenLoading";
import PageSection from "../../components/PageSection";
import {
  ViewPageBuilder,
  ViewPageSection,
} from "../../components/view-builder/ViewPageBuilder";
import { Pen } from "lucide-react";
import { PageIconAction } from "../../components/breadcrumb";
import { useRouter, useParams } from "next/navigation";
import NotFoundComponent from "@/components/NotFoundComponent";
import { format } from "date-fns";

export default function CustomersViewPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const { data, loading } = useUserQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id as string,
    },
  });

  const breadcrumbsLabels = useCustomerViewBreadcrumbLabels();
  const breadcrumbsIcons = useCustomerViewBreadcrumbIcons({
    id: data?.user?.id!,
  });

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    try {
      return format(new Date(parseInt(dateString)), "MMM dd, yyyy HH:mm");
    } catch {
      return "Invalid date";
    }
  };

  const sections: ViewPageSection[] = [
    {
      title: "Personal Information",
      dataItems: [
        {
          title: "Name",
          value: data?.user?.name || "-",
        },
        {
          title: "Email",
          value: data?.user?.email,
        },
        {
          title: "Phone",
          value: data?.user?.phone || "-",
        },
      ],
    },
    {
      title: "Account Information",
      dataItems: [
        {
          title: "Role",
          value: data?.user?.role,
        },
        {
          title: "Status",
          value: data?.user?.isActive ? "Active" : "Inactive",
        },
        {
          title: "Joined",
          value: formatDate(data?.user?.createdAt),
        },
        {
          title: "Last Updated",
          value: formatDate(data?.user?.updatedAt),
        },
      ],
    },
  ];

  if (loading) return <FullScreenLoading />;
  if (!data?.user) return <NotFoundComponent />;

  return (
    <PageSection breadcrumbs={breadcrumbsLabels} icons={breadcrumbsIcons}>
      <ViewPageBuilder sections={sections} />
    </PageSection>
  );
}

const useCustomerViewBreadcrumbLabels = () => {
  return [
    {
      label: "customersList",
      href: "/admin/customers",
    },
    {
      label: "view",
      href: "/admin/customers/view",
    },
  ];
};

const useCustomerViewBreadcrumbIcons = ({ id }: { id: string }) => {
  const router = useRouter();

  const icons: PageIconAction[] = [
    {
      id: "edit",
      label: "edit",
      component: <Pen />,
      onClick: () => router.push(`/admin/customers/${id}/edit`),
      disabled: false,
    },
  ];
  return icons;
};
