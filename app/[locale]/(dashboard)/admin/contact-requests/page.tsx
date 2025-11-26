"use client";

import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_REQUESTS } from "@/graphql/operations/contactRequest.operations";
import PageSection from "../components/PageSection";
import TankStackTable from "../components/data-table/TankStackTable";
import { ListPageFilter } from "../components/ListPageFilter";
import { useFilters } from "../_hooks/useFiltersComponents";
import { useContactRequestListBreadcrumbIcons } from "./_hooks/useContactRequestListBreadcrumbIcons";
import { useContactRequestListBreadcrumbLabels } from "./_hooks/useContactRequestListBreadcrumbLabels";
import { useContactRequestTableColumns } from "./_hooks/useContactRequestTableColumns";

interface ContactRequestFilterData {
  search?: string;
  status?: string;
}

export default function ContactRequestsPage() {
  const breadcrumbsLabels = useContactRequestListBreadcrumbLabels();
  const icons = useContactRequestListBreadcrumbIcons();
  const columns = useContactRequestTableColumns();

  const breadcrumbs = React.useMemo(() => [
    { label: breadcrumbsLabels.dashboard, to: "/admin" },
    { label: breadcrumbsLabels.contactRequests },
  ], [breadcrumbsLabels]);

  const pageIcons = React.useMemo(() => [
    {
      id: "dashboard",
      component: icons.dashboard,
    },
    {
      id: "contactRequests",
      component: icons.contactRequests,
    }
  ], [icons]);

  // Setup filters using the reusable hook
  const { filterComponents, onSubmit, onClear } = useFilters<ContactRequestFilterData>(
    [
      { 
        type: "search", 
        name: "search", 
        label: "Search Requests", 
        placeholder: "Search by name, email..." 
      },
      { 
        type: "select", 
        name: "status", 
        label: "Status",
        options: [
          { label: "New", value: "NEW" },
          { label: "In Progress", value: "IN_PROGRESS" },
          { label: "Resolved", value: "RESOLVED" },
          { label: "Archived", value: "ARCHIVED" },
        ]
      },
    ],
    { search: "", status: "" }
  );

  const [filters, setFilters] = React.useState<ContactRequestFilterData>({});

  const handleFilterSubmit = (data: ContactRequestFilterData) => {
    setFilters(data);
  };

  const { data, loading } = useQuery(GET_CONTACT_REQUESTS, {
    variables: {
      filters: {
        search: filters.search || undefined,
        status: filters.status || undefined,
      },
      take: 50,
    },
    pollInterval: 30000,
  });

  const contactRequests = data?.contactRequests?.items || [];
  const paginationDetails = data?.contactRequests?.pagination;

  return (
    <PageSection
      breadcrumbs={breadcrumbs}
      icons={pageIcons}
      isLoading={loading}
    >
      <ListPageFilter
        filterComponents={filterComponents}
        onSubmit={onSubmit(handleFilterSubmit)}
        onClear={() => {
          onClear();
          setFilters({});
        }}
      />
      
      <TankStackTable
        columns={columns}
        data={contactRequests}
        loading={loading}
        paginatorInfo={paginationDetails}
        hidePagination={!paginationDetails}
      />
    </PageSection>
  );
}
