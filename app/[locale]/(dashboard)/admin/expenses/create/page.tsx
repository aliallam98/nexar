"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
  MenuItem,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  CREATE_EXPENSE,
  GET_EXPENSE_CATEGORIES_DROPDOWN,
  GET_EXPENSES,
} from "@/graphql/operations/expense.operations";
import PageSection from "../../components/PageSection";
import { useExpenseListBreadcrumbIcons } from "../_hooks/useExpenseListBreadcrumbIcons";
import { useExpenseListBreadcrumbLabels } from "../_hooks/useExpenseListBreadcrumbLabels";

const expenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  expenseDate: z.date({ required_error: "Date is required" }),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

export default function CreateExpensePage() {
  const router = useRouter();
  const breadcrumbsLabels = useExpenseListBreadcrumbLabels();
  const icons = useExpenseListBreadcrumbIcons();

  const { data: categoriesData, loading: loadingCategories } = useQuery(
    GET_EXPENSE_CATEGORIES_DROPDOWN
  );

  const [createExpense, { loading: creating }] = useMutation(CREATE_EXPENSE, {
    refetchQueries: [{ query: GET_EXPENSES }],
    onCompleted: () => {
      toast.success("Expense created successfully");
      router.push("/admin/expenses");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      categoryId: "",
      expenseDate: new Date(),
    },
  });

  const onSubmit = (data: ExpenseFormValues) => {
    createExpense({
      variables: {
        input: {
          ...data,
          amount: Number(data.amount),
        },
      },
    });
  };

  const breadcrumbs = [
    { label: breadcrumbsLabels.dashboard, to: "/admin" },
    { label: breadcrumbsLabels.expenses, to: "/admin/expenses" },
    { label: "Create Expense" },
  ];

  const pageIcons = [
    {
      id: "dashboard",
      component: icons.dashboard,
    },
    {
      id: "expenses",
      component: icons.expenses,
    },
  ];

  return (
    <PageSection
      breadcrumbs={breadcrumbs}
      icons={pageIcons}
      isLoading={loadingCategories}
    >
      <Box sx={{ maxWidth: 800, mx: "auto", width: "100%" }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={4}>
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Create Expense
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Add a new expense record
            </Typography>
          </Box>
        </Stack>

        <Card>
          <CardHeader title="Expense Details" />
          <Divider />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Amount"
                        type="number"
                        fullWidth
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Category"
                        fullWidth
                        error={!!errors.categoryId}
                        helperText={errors.categoryId?.message}
                        disabled={loadingCategories}
                      >
                        {categoriesData?.expenseCategoriesDropdown?.map((cat: any) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                      name="expenseDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="Date"
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.expenseDate,
                              helperText: errors.expenseDate?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => router.back()}
                      disabled={creating}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={creating ? <CircularProgress size={20} /> : <SaveIcon />}
                      disabled={creating}
                    >
                      Create Expense
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </PageSection>
  );
}
