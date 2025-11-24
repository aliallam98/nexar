"use client";

import * as React from "react";
import PageSection from "../components/PageSection";
import { useCategoryListBreadcrumbIcons } from "./_hooks/useCategoryListBreadcrumbIcons";
import { useCategoryListBreadcrumbLabels } from "./_hooks/useCategoryListBreadcrumbLabels";
import { useCategoriesQuery } from "@/graphql/queries/category/categories.generated";
import TankStackTable from "../components/data-table/TankStackTable";
import { useCategoryTableColumns } from "./_hooks/useCategoryTableColumns";
import { useFilters } from "../_hooks/useFiltersComponents";
import { ListPageFilter } from "../components/ListPageFilter";

interface CategoryFilterData {
  searchTerm?: string;
  createdFrom?: Date | null;
  createdTo?: Date | null;
}

export default function CategoriesListPage() {
  const breadcrumbsLabels = useCategoryListBreadcrumbLabels();
  const icons = useCategoryListBreadcrumbIcons();
  const columns = useCategoryTableColumns();

  // Setup filters using the reusable hook
  const { filterComponents, onSubmit, onClear } = useFilters<CategoryFilterData>(
    [
      { type: "search", name: "searchTerm", label: "Search Categories", placeholder: "Search by name..." },
      { type: "dateFrom", name: "createdFrom", label: "Created From" },
      { type: "dateTo", name: "createdTo", label: "Created To" },
    ],
    { searchTerm: "", createdFrom: null, createdTo: null }
  );

  const handleFilterSubmit = (data: CategoryFilterData) => {
    console.log("Applying filters:", data);
    // TODO: Apply filters to query
  };

  const { data, loading } = useCategoriesQuery({
    fetchPolicy: "no-cache",
  });

  const categories = data?.categories.data;
  const paginationDetails = data?.categories.paginationDetails;

  return (
    <PageSection
      breadcrumbs={breadcrumbsLabels}
      icons={icons}
      isLoading={loading}
    >
      <ListPageFilter
        filterComponents={filterComponents}
        onSubmit={onSubmit(handleFilterSubmit)}
        onClear={onClear}
      />
      
      <TankStackTable
        columns={columns}
        data={categories as any}
        loading={loading}
        paginatorInfo={paginationDetails}
      />
    </PageSection>
  );
}
