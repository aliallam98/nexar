import { gql } from "@apollo/client";

export const GET_EXPENSE_CATEGORIES = gql`
  query GetExpenseCategories($pagination: PaginationInput) {
    expenseCategories(pagination: $pagination) {
      data {
        id
        name
        description
        isActive
        createdAt
        updatedAt
      }
      paginationDetails {
        currentPage
        perPage
        totalPages
        totalItems
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_EXPENSE_CATEGORIES_DROPDOWN = gql`
  query GetExpenseCategoriesDropdown {
    expenseCategoriesDropdown {
      id
      name
    }
  }
`;

export const GET_EXPENSE_CATEGORY = gql`
  query GetExpenseCategory($id: String!) {
    expenseCategory(id: $id) {
      id
      name
      description
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_EXPENSE_CATEGORY = gql`
  mutation CreateExpenseCategory($input: JSON!) {
    createExpenseCategory(input: $input) {
      id
      name
      description
      isActive
    }
  }
`;

export const UPDATE_EXPENSE_CATEGORY = gql`
  mutation UpdateExpenseCategory($id: String!, $input: JSON!) {
    updateExpenseCategory(id: $id, input: $input) {
      id
      name
      description
      isActive
    }
  }
`;

export const DELETE_EXPENSE_CATEGORY = gql`
  mutation DeleteExpenseCategory($id: String!) {
    deleteExpenseCategory(id: $id)
  }
`;

export const TOGGLE_EXPENSE_CATEGORY_STATUS = gql`
  mutation ToggleExpenseCategoryStatus($id: String!) {
    toggleExpenseCategoryStatus(id: $id) {
      id
      isActive
    }
  }
`;

export const GET_EXPENSES = gql`
  query GetExpenses(
    $pagination: PaginationInput
    $categoryId: String
    $createdById: String
    $startDate: String
    $endDate: String
    $status: String
  ) {
    expenses(
      pagination: $pagination
      categoryId: $categoryId
      createdById: $createdById
      startDate: $startDate
      endDate: $endDate
      status: $status
    ) {
      data {
        id
        amount
        description
        expenseDate
        status
        category {
          id
          name
        }
        createdBy {
          id
          name
          email
        }
        createdAt
      }
      paginationDetails {
        currentPage
        perPage
        totalPages
        totalItems
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_EXPENSE = gql`
  query GetExpense($id: String!) {
    expense(id: $id) {
      id
      amount
      description
      expenseDate
      status
      categoryId
      category {
        id
        name
      }
      createdBy {
        id
        name
        email
      }
      editRequests {
        id
        status
        proposedChanges
        createdAt
        requestedBy {
          id
          name
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($input: JSON!) {
    createExpense(input: $input) {
      id
      amount
      description
      expenseDate
      status
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($id: String!, $input: JSON!) {
    updateExpense(id: $id, input: $input) {
      id
      amount
      description
      expenseDate
      status
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: String!) {
    deleteExpense(id: $id)
  }
`;
