"use client";

import { CategoryForm } from "../_components/CategoryForm";
import PageSection from "../../components/PageSection";
import { useCategoryCreateBreadcrumbLabels } from "./_hooks/useCategoryCreateBreadcrumbLabels";
import { useCreateCategoryMutation } from "@/graphql/mutations/category/create.generated";
import { toast } from "sonner";

export default function CategoriesCreatePage() {
  const [createCategory, { loading }] = useCreateCategoryMutation();

  const onSubmit = async (data: any) => {
    try {
      const result = await createCategory({
        variables: {
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

  const breadcrumbsLabels = useCategoryCreateBreadcrumbLabels();

  return (
    <PageSection breadcrumbs={breadcrumbsLabels}>
      <CategoryForm onSubmit={onSubmit} loading={loading} />
    </PageSection>
  );
}
