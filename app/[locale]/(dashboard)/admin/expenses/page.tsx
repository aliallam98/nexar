"use client";

import * as React from "react";
import PageSection from "../components/PageSection";
import { useExpenseListBreadcrumbIcons } from "./_hooks/useExpenseListBreadcrumbIcons";
import { useExpenseListBreadcrumbLabels } from "./_hooks/useExpenseListBreadcrumbLabels";
import { useExpensesQuery } from "@/graphql/queries/expense/expenses.generated";
import TankStackTable from "../components/data-table/TankStackTable";
import { useExpenseTableColumns } from "./_hooks/useExpenseTableColumns";
import { useFilters } from "../_hooks/useFiltersComponents";
import { ListPageFilter } from "../components/ListPageFilter";

interface ExpenseFilterData {
  searchTerm?: string;
  categoryId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  status?: string;
}

export default function ExpensesListPage() {
  const breadcrumbsLabels = useExpenseListBreadcrumbLabels();
  const icons = useExpenseListBreadcrumbIcons();
  const columns = useExpenseTableColumns();

  const [filters, setFilters] = React.useState<ExpenseFilterData>({});

  const { filterComponents, onSubmit, onClear } = useFilters<ExpenseFilterData>(
    [
      { type: "search", name: "searchTerm", label: "Search Expenses", placeholder: "Search by title..." },
      { type: "dateFrom", name: "startDate", label: "From Date" },
      { type: "dateTo", name: "endDate", label: "To Date" },
    ],
    { searchTerm: "", startDate: null, endDate: null }
  );

  const handleFilterSubmit = (data: ExpenseFilterData) => {
    setFilters(data);
  };

  const { data, loading } = useExpensesQuery({
    fetchPolicy: "no-cache",
    variables: {
      startDate: filters.startDate?.toISOString(),
      endDate: filters.endDate?.toISOString(),
    },
  });

  const expenses = data?.expenses.data;
  const paginationDetails = data?.expenses.paginationDetails;

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
        data={expenses as any}
        loading={loading}
        paginatorInfo={paginationDetails}
      />
    </PageSection>
  );
}
