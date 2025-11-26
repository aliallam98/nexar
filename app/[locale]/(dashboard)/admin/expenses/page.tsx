"use client";

import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_EXPENSES, GET_EXPENSE_CATEGORIES_DROPDOWN } from "@/graphql/operations/expense.operations";
import PageSection from "../components/PageSection";
import TankStackTable from "../components/data-table/TankStackTable";
import { ListPageFilter } from "../components/ListPageFilter";
import { useFilters } from "../_hooks/useFiltersComponents";
import { useExpenseListBreadcrumbIcons } from "./_hooks/useExpenseListBreadcrumbIcons";
import { useExpenseListBreadcrumbLabels } from "./_hooks/useExpenseListBreadcrumbLabels";
import { useExpenseTableColumns } from "./_hooks/useExpenseTableColumns";

interface ExpenseFilterData {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export default function ExpensesPage() {
  const breadcrumbsLabels = useExpenseListBreadcrumbLabels();
  const icons = useExpenseListBreadcrumbIcons();
  const columns = useExpenseTableColumns();

  const breadcrumbs = React.useMemo(() => [
    { label: breadcrumbsLabels.dashboard, to: "/admin" },
    { label: breadcrumbsLabels.expenses },
  ], [breadcrumbsLabels]);

  const pageIcons = React.useMemo(() => [
    {
      id: "dashboard",
      component: icons.dashboard,
    },
    {
      id: "expenses",
      component: icons.expenses,
    },
    {
      id: "add",
      component: icons.add,
      onClick: icons.actions.add,
    }
  ], [icons]);

  const { data: categoriesData } = useQuery(GET_EXPENSE_CATEGORIES_DROPDOWN);
  
  const categoryOptions = React.useMemo(() => {
    return categoriesData?.expenseCategoriesDropdown?.map((cat: any) => ({
      label: cat.name,
      value: cat.id,
    })) || [];
  }, [categoriesData]);

  // Setup filters using the reusable hook
  const { filterComponents, onSubmit, onClear } = useFilters<ExpenseFilterData>(
    [
      { 
        type: "select", 
        name: "categoryId", 
        label: "Category",
        options: categoryOptions,
      },
      { 
        type: "select", 
        name: "status", 
        label: "Status",
        options: [
          { label: "Approved", value: "APPROVED" },
          { label: "Pending Edit", value: "PENDING_EDIT" },
          { label: "Rejected Edit", value: "REJECTED_EDIT" },
        ]
      },
      {
        type: "dateFrom",
        name: "startDate",
        label: "Start Date",
      },
      {
        type: "dateTo",
        name: "endDate",
        label: "End Date",
      },
    ],
    { categoryId: "", status: "", startDate: "", endDate: "" }
  );

  const [filters, setFilters] = React.useState<ExpenseFilterData>({});

  const handleFilterSubmit = (data: ExpenseFilterData) => {
    setFilters(data);
  };

  const { data, loading } = useQuery(GET_EXPENSES, {
    variables: {
      pagination: { page: 1, perPage: 20 },
      categoryId: filters.categoryId || undefined,
      status: filters.status || undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
    },
    fetchPolicy: "network-only",
  });

  const expenses = data?.expenses?.data || [];
  const paginationDetails = data?.expenses?.paginationDetails;

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
        data={expenses}
        loading={loading}
        paginatorInfo={paginationDetails}
        hidePagination={!paginationDetails}
      />
    </PageSection>
  );
}
