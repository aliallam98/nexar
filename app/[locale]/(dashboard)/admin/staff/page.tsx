"use client";

import * as React from "react";
import PageSection from "../components/PageSection";
import { useStaffListBreadcrumbIcons } from "./_hooks/useStaffListBreadcrumbIcons";
import { useStaffListBreadcrumbLabels } from "./_hooks/useStaffListBreadcrumbLabels";
import { useStaffQuery } from "@/graphql/queries/user/staff.generated";
import TankStackTable from "../components/data-table/TankStackTable";
import { useStaffTableColumns } from "./_hooks/useStaffTableColumns";
import { useFilters } from "../_hooks/useFiltersComponents";
import { ListPageFilter } from "../components/ListPageFilter";

interface StaffFilterData {
  searchTerm?: string;
  isActive?: boolean;
}

export default function StaffListPage() {
  const breadcrumbsLabels = useStaffListBreadcrumbLabels();
  const icons = useStaffListBreadcrumbIcons();
  const columns = useStaffTableColumns();

  // Setup filters using the reusable hook
  const { filterComponents, onSubmit, onClear } = useFilters<StaffFilterData>(
    [
      { type: "search", name: "searchTerm", label: "Search Staff", placeholder: "Search by name or email..." },
    ],
    { searchTerm: "" }
  );

  const handleFilterSubmit = (data: StaffFilterData) => {
    console.log("Applying filters:", data);
    // TODO: Apply filters to query
  };

  const { data, loading } = useStaffQuery({
    fetchPolicy: "no-cache",
  });

  const staff = data?.staff.data;
  const paginationDetails = data?.staff.paginationDetails;

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
        data={staff as any}
        loading={loading}
        paginatorInfo={paginationDetails}
      />
    </PageSection>
  );
}
