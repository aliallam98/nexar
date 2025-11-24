"use client";

import { useCategoryQuery } from "@/graphql/queries/category/category.generated";
import { FullScreenLoading } from "../../components/FullScreenLoading";
import PageSection from "../../components/PageSection";
import {
  ViewPageBuilder,
  ViewPageSection,
} from "../../components/view-builder/ViewPageBuilder";
import { Pen } from "lucide-react";
import { PageIconAction } from "../../components/breadcrumb";
import { redirect, useParams } from "next/navigation";
import NotFoundComponent from "@/components/NotFoundComponent";

export default function CategoriesViewPage() {
  const { id } = useParams();
  const { data, loading } = useCategoryQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id as string,
    },
  });
  const breadcrumbsLabels = useCategoryViewBreadcrumbLabels();
  const breadcrumbsIcons = useCategoryViewBreadcrumbIcons({
    id: data?.category?.id!,
  });

  const sections: ViewPageSection[] = [
    {
      title: "",
      dataItems: [
        {
          title: "name",
          value: data?.category?.name,
        },
        {
          title: "description",
          value: data?.category?.description,
        },
        {
          title: "isActive",
          value: data?.category?.isActive ? "Yes" : "No",
        },
        {
          title: "createdAt",
          value: data?.category?.createdAt,
        },
      ],
    },
  ];

  if (loading) return <FullScreenLoading />;
  if (!data?.category) return <NotFoundComponent />;
  return (
    <PageSection breadcrumbs={breadcrumbsLabels} icons={breadcrumbsIcons}>
      <ViewPageBuilder sections={sections} />
    </PageSection>
  );
}
const useCategoryViewBreadcrumbLabels = () => {
  return [
    {
      label: "categoriesList",
      href: "/admin/categories",
    },
    {
      label: "edit",
      href: "/admin/categories/edit",
    },
  ];
};

const useCategoryViewBreadcrumbIcons = ({ id }: { id: string }) => {
  const icons: PageIconAction[] = [
    {
      id: "save",
      label: "add",
      component: <Pen />,
      onClick: () => redirect(`/admin/categories/${id}/edit`),
      disabled: false,
    },
  ];
  return icons;
};
