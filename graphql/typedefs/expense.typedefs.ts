import { gql } from "graphql-tag";

export const expenseTypeDefs = gql`
  # Expense Enums
  enum ExpenseStatus {
    APPROVED
    PENDING_EDIT
    REJECTED_EDIT
  }

  enum EditRequestStatus {
    PENDING
    APPROVED
    REJECTED
  }

  # Expense Category Type
  type ExpenseCategory {
    id: ID!
    name: String!
    description: String
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  # Expense Type
  type Expense {
    id: ID!
    title: String!
    description: String
    amount: Float!
    receiptUrl: String
    expenseDate: String!
    category: ExpenseCategory!
    createdBy: User!
    status: ExpenseStatus!
    editRequests: [ExpenseEditRequest!]!
    createdAt: String!
    updatedAt: String!
  }

  # Expense Edit Request Type
  type ExpenseEditRequest {
    id: ID!
    expense: Expense!
    requestedBy: User!
    proposedChanges: JSON!
    status: EditRequestStatus!
    reviewedBy: User
    reviewedAt: String
    rejectionReason: String
    createdAt: String!
    updatedAt: String!
  }

  # Paginated Expenses
  type PaginatedExpenses {
    data: [Expense!]!
    paginationDetails: PaginationDetails!
  }

  # Paginated Expense Categories
  type PaginatedExpenseCategories {
    data: [ExpenseCategory!]!
    paginationDetails: PaginationDetails!
  }

  # Paginated Edit Requests
  type PaginatedExpenseEditRequests {
    data: [ExpenseEditRequest!]!
    paginationDetails: PaginationDetails!
  }

  # Input Types
  input CreateExpenseCategoryInput {
    name: String!
    description: String
  }

  input UpdateExpenseCategoryInput {
    name: String
    description: String
    isActive: Boolean
  }

  input CreateExpenseInput {
    title: String!
    description: String
    amount: Float!
    receiptUrl: String
    expenseDate: String!
    categoryId: String!
  }

  input UpdateExpenseInput {
    title: String
    description: String
    amount: Float
    receiptUrl: String
    expenseDate: String
    categoryId: String
  }

  extend type Query {
    # Expense Category Queries
    expenseCategory(id: ID!): ExpenseCategory
    expenseCategories(pagination: PaginationInput): PaginatedExpenseCategories!
    expenseCategoriesDropdown: [ExpenseCategory!]!

    # Expense Queries
    expense(id: ID!): Expense
    expenses(
      pagination: PaginationInput
      categoryId: String
      createdById: String
      startDate: String
      endDate: String
      status: ExpenseStatus
    ): PaginatedExpenses!

    # Edit Request Queries
    expenseEditRequest(id: ID!): ExpenseEditRequest
    expenseEditRequests(
      pagination: PaginationInput
      requestedById: String
      status: EditRequestStatus
    ): PaginatedExpenseEditRequests!
    pendingExpenseEditRequests: [ExpenseEditRequest!]!
  }

  extend type Mutation {
    # Expense Category Mutations
    createExpenseCategory(input: CreateExpenseCategoryInput!): ExpenseCategory!
    updateExpenseCategory(id: ID!, input: UpdateExpenseCategoryInput!): ExpenseCategory!
    deleteExpenseCategory(id: ID!): Boolean!
    toggleExpenseCategoryStatus(id: ID!): ExpenseCategory!

    # Expense Mutations
    createExpense(input: CreateExpenseInput!): Expense!
    updateExpense(id: ID!, input: UpdateExpenseInput!): Expense!
    deleteExpense(id: ID!): Boolean!

    # Edit Request Mutations
    approveExpenseEdit(id: ID!): Expense!
    rejectExpenseEdit(id: ID!, rejectionReason: String): Expense!
  }
`;
