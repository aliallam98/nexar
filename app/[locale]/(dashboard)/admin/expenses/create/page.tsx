"use client";

import { ExpenseForm } from "../_components/ExpenseForm";
import PageSection from "../../components/PageSection";
import { useCreateExpenseMutation } from "@/graphql/mutations/expense/create-expense.generated";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ExpenseCreatePage() {
  const router = useRouter();
  const [createExpense, { loading }] = useCreateExpenseMutation();

  const onSubmit = async (data: any) => {
    try {
      await createExpense({
        variables: {
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

      toast.success("Expense created successfully");
      router.push("/admin/expenses");
    } catch (error: any) {
      console.error("Error creating expense:", error);
      toast.error(error.message || "Error creating expense");
    }
  };

  const breadcrumbsLabels = ["Dashboard", "Expenses", "Create"];

  return (
    <PageSection breadcrumbs={breadcrumbsLabels}>
      <ExpenseForm onSubmit={onSubmit} loading={loading} />
    </PageSection>
  );
}
