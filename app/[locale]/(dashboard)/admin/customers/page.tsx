"use client";

import * as React from "react";
import PageSection from "../components/PageSection";
import { useCustomerListBreadcrumbIcons } from "./_hooks/useCustomerListBreadcrumbIcons";
import { useCustomerListBreadcrumbLabels } from "./_hooks/useCustomerListBreadcrumbLabels";
import { useCustomersQuery } from "@/graphql/queries/user/customers.generated";
import TankStackTable from "../components/data-table/TankStackTable";
import { useCustomerTableColumns } from "./_hooks/useCustomerTableColumns";
import { useFilters } from "../_hooks/useFiltersComponents";
import { ListPageFilter } from "../components/ListPageFilter";

interface CustomerFilterData {
  searchTerm?: string;
  isActive?: boolean;
}

export default function CustomersListPage() {
  const breadcrumbsLabels = useCustomerListBreadcrumbLabels();
  const icons = useCustomerListBreadcrumbIcons();
  const columns = useCustomerTableColumns();

  // Setup filters using the reusable hook
  const { filterComponents, onSubmit, onClear } = useFilters<CustomerFilterData>(
    [
      { type: "search", name: "searchTerm", label: "Search Customers", placeholder: "Search by name or email..." },
    ],
    { searchTerm: "" }
  );

  const handleFilterSubmit = (data: CustomerFilterData) => {
    console.log("Applying filters:", data);
    // TODO: Apply filters to query
  };

  const { data, loading } = useCustomersQuery({
    fetchPolicy: "no-cache",
  });

  const customers = data?.customers.data;
  const paginationDetails = data?.customers.paginationDetails;

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
        data={customers as any}
        loading={loading}
        paginatorInfo={paginationDetails}
      />
    </PageSection>
  );
}
