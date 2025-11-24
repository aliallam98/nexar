"use client";

import { ExpenseForm } from "../_components/ExpenseForm";
import PageSection from "../../components/PageSection";
import { useUpdateExpenseMutation } from "@/graphql/mutations/expense/update-expense.generated";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

export default function ExpenseEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [updateExpense, { loading }] = useUpdateExpenseMutation();

  const onSubmit = async (data: any) => {
    try {
      await updateExpense({
        variables: {
          id,
          input: {
            title: data.title,
            description: data.description,
            amount: data.amount,
            receiptUrl: data.receiptUrl,
            expenseDate: data.expenseDate,
            categoryId: data.categoryId,
          },
        },
      });

      toast.success("Expense updated successfully");
      router.push("/admin/expenses");
    } catch (error: any) {
      console.error("Error updating expense:", error);
      toast.error(error.message || "Error updating expense");
    }
  };

  const breadcrumbsLabels = ["Dashboard", "Expenses", "Edit"];

  return (
    <PageSection breadcrumbs={breadcrumbsLabels}>
      <ExpenseForm onSubmit={onSubmit} loading={loading} />
    </PageSection>
  );
}
