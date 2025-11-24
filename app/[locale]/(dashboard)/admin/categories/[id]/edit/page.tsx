"use client";
import { useCategoryQuery } from "@/graphql/queries/category/category.generated";
import { Category, CreateCategoryInput } from "@/graphql/types";
import { useParams } from "next/navigation";
import React from "react";
import { FullScreenLoading } from "../../../components/FullScreenLoading";
import PageSection from "../../../components/PageSection";
import { CategoryForm } from "../../_components/CategoryForm";
import { toast } from "sonner";
import { useUpdateCategoryMutation } from "@/graphql/mutations/category/update.generated";

export default function CategoriesEditPage() {
  const { id } = useParams();
  const [updateCategory, { loading: updateLoading }] =
    useUpdateCategoryMutation();

  const { data, loading } = useCategoryQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id as string,
    },
  });

  const defaultValuesForForm: CreateCategoryInput = {
    name: data?.category?.name || "",
    description: data?.category?.description,
    image: data?.category?.image,
  };

  const onSubmit = async (data: any) => {
    try {
      const result = await updateCategory({
        variables: {
          id: id as string,
          input: {
            name: data.name,
            description: data.description,
            image: data.image,
          },
        },
      });

      toast.success("Category created successfully");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Error creating category");
    }
  };

  if (loading) return <FullScreenLoading />;

  return (
    <PageSection>
      <CategoryForm defaultValues={defaultValuesForForm} onSubmit={onSubmit} />
    </PageSection>
  );
}
//
