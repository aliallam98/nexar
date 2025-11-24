import prisma from "../../lib/prisma";
import { Role } from "@prisma/client";

// Helper function for pagination
const calculatePaginationDetails = (
  total: number,
  page: number,
  perPage: number,
  currentItemsCount: number
) => {
  const totalPages = Math.ceil(total / perPage);
  return {
    currentPage: page,
    perPage,
    totalPages,
    totalItems: total,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

// Helper to check if user is admin or staff (not customer)
const checkExpenseAccess = (context: any) => {
  if (!context.userId) throw new Error("Unauthorized");
  if (!context.userRole) throw new Error("User role not found");
  if (context.userRole === Role.CUSTOMER) {
    throw new Error("Customers do not have access to expense features");
  }
};

// Helper to check if user is admin
const checkAdminAccess = (context: any) => {
  if (!context.userId) throw new Error("Unauthorized");
  if (context.userRole !== Role.ADMIN) {
    throw new Error("Admin access required");
  }
};

export const expenseResolver = {
  Query: {
    // Get single expense category
    expenseCategory: async (_: any, { id }: { id: string }, context: any) => {
      checkExpenseAccess(context);
      return prisma.expenseCategory.findUnique({ where: { id } });
    },

    // Get paginated expense categories
    expenseCategories: async (
      _: any,
      { pagination = { page: 1, perPage: 20 } }: { pagination?: { page?: number; perPage?: number } },
      context: any
    ) => {
      checkExpenseAccess(context);
      const { page = 1, perPage = 20 } = pagination;
      const skip = (page - 1) * perPage;

      const where = { isActive: true };

      const [data, total] = await Promise.all([
        prisma.expenseCategory.findMany({
          where,
          skip,
          take: perPage,
          orderBy: { name: "asc" },
        }),
        prisma.expenseCategory.count({ where }),
      ]);

      return {
        data,
        paginationDetails: calculatePaginationDetails(total, page, perPage, data.length),
      };
    },

    // Get all active categories for dropdown
    expenseCategoriesDropdown: async (_: any, __: any, context: any) => {
      checkExpenseAccess(context);
      return prisma.expenseCategory.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
      });
    },

    // Get single expense
    expense: async (_: any, { id }: { id: string }, context: any) => {
      checkExpenseAccess(context);
      return prisma.expense.findUnique({
        where: { id },
        include: {
          category: true,
          createdBy: true,
          editRequests: {
            include: {
              requestedBy: true,
              reviewedBy: true,
            },
          },
        },
      });
    },

    // Get paginated expenses with filters
    expenses: async (
      _: any,
      {
        pagination = { page: 1, perPage: 20 },
        categoryId,
        createdById,
        startDate,
        endDate,
        status,
      }: {
        pagination?: { page?: number; perPage?: number };
        categoryId?: string;
        createdById?: string;
        startDate?: string;
        endDate?: string;
        status?: string;
      },
      context: any
    ) => {
      checkExpenseAccess(context);
      const { page = 1, perPage = 20 } = pagination;
      const skip = (page - 1) * perPage;

      const where: any = {};
      if (categoryId) where.categoryId = categoryId;
      if (createdById) where.createdById = createdById;
      if (status) where.status = status;
      if (startDate || endDate) {
        where.expenseDate = {};
        if (startDate) where.expenseDate.gte = new Date(startDate);
        if (endDate) where.expenseDate.lte = new Date(endDate);
      }

      const [data, total] = await Promise.all([
        prisma.expense.findMany({
          where,
          skip,
          take: perPage,
          include: {
            category: true,
            createdBy: true,
          },
          orderBy: { expenseDate: "desc" },
        }),
        prisma.expense.count({ where }),
      ]);

      return {
        data,
        paginationDetails: calculatePaginationDetails(total, page, perPage, data.length),
      };
    },

    // Get single edit request
    expenseEditRequest: async (_: any, { id }: { id: string }, context: any) => {
      checkExpenseAccess(context);
      return prisma.expenseEditRequest.findUnique({
        where: { id },
        include: {
          expense: {
            include: {
              category: true,
              createdBy: true,
            },
          },
          requestedBy: true,
          reviewedBy: true,
        },
      });
    },

    // Get paginated edit requests
    expenseEditRequests: async (
      _: any,
      {
        pagination = { page: 1, perPage: 20 },
        requestedById,
        status,
      }: {
        pagination?: { page?: number; perPage?: number };
        requestedById?: string;
        status?: string;
      },
      context: any
    ) => {
      checkExpenseAccess(context);
      const { page = 1, perPage = 20 } = pagination;
      const skip = (page - 1) * perPage;

      const where: any = {};
      if (requestedById) where.requestedById = requestedById;
      if (status) where.status = status;

      const [data, total] = await Promise.all([
        prisma.expenseEditRequest.findMany({
          where,
          skip,
          take: perPage,
          include: {
            expense: {
              include: {
                category: true,
                createdBy: true,
              },
            },
            requestedBy: true,
            reviewedBy: true,
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.expenseEditRequest.count({ where }),
      ]);

      return {
        data,
        paginationDetails: calculatePaginationDetails(total, page, perPage, data.length),
      };
    },

    // Get all pending edit requests (for admin dashboard)
    pendingExpenseEditRequests: async (_: any, __: any, context: any) => {
      checkAdminAccess(context);
      return prisma.expenseEditRequest.findMany({
        where: { status: "PENDING" },
        include: {
          expense: {
            include: {
              category: true,
              createdBy: true,
            },
          },
          requestedBy: true,
        },
        orderBy: { createdAt: "asc" },
      });
    },
  },

  Mutation: {
    // Create expense category
    createExpenseCategory: async (
      _: any,
      { input }: { input: any },
      context: any
    ) => {
      checkAdminAccess(context);

      const existing = await prisma.expenseCategory.findUnique({
        where: { name: input.name },
      });
      if (existing) throw new Error("Category with this name already exists");

      return prisma.expenseCategory.create({
        data: input,
      });
    },

    // Update expense category
    updateExpenseCategory: async (
      _: any,
      { id, input }: { id: string; input: any },
      context: any
    ) => {
      checkAdminAccess(context);

      if (input.name) {
        const existing = await prisma.expenseCategory.findFirst({
          where: {
            name: input.name,
            id: { not: id },
          },
        });
        if (existing) throw new Error("Another category with this name already exists");
      }

      return prisma.expenseCategory.update({
        where: { id },
        data: input,
      });
    },

    // Delete expense category (soft delete)
    deleteExpenseCategory: async (_: any, { id }: { id: string }, context: any) => {
      checkAdminAccess(context);

      await prisma.expenseCategory.update({
        where: { id },
        data: { isActive: false },
      });
      return true;
    },

    // Toggle expense category status
    toggleExpenseCategoryStatus: async (_: any, { id }: { id: string }, context: any) => {
      checkAdminAccess(context);

      const category = await prisma.expenseCategory.findUnique({ where: { id } });
      if (!category) throw new Error("Category not found");

      return prisma.expenseCategory.update({
        where: { id },
        data: { isActive: !category.isActive },
      });
    },

    // Create expense (auto-approved for both admin and staff)
    createExpense: async (_: any, { input }: { input: any }, context: any) => {
      checkExpenseAccess(context);

      return prisma.expense.create({
        data: {
          ...input,
          expenseDate: new Date(input.expenseDate),
          createdById: context.userId,
          status: "APPROVED", // Auto-approved
        },
        include: {
          category: true,
          createdBy: true,
        },
      });
    },

    // Update expense (admin: direct edit, staff: create edit request)
    updateExpense: async (
      _: any,
      { id, input }: { id: string; input: any },
      context: any
    ) => {
      checkExpenseAccess(context);

      const expense = await prisma.expense.findUnique({ where: { id } });
      if (!expense) throw new Error("Expense not found");

      // Admin can edit directly
      if (context.userRole === Role.ADMIN) {
        return prisma.expense.update({
          where: { id },
          data: {
            ...input,
            ...(input.expenseDate && { expenseDate: new Date(input.expenseDate) }),
          },
          include: {
            category: true,
            createdBy: true,
          },
        });
      }

      // Staff must create edit request
      // Check if there's already a pending edit request
      const pendingRequest = await prisma.expenseEditRequest.findFirst({
        where: {
          expenseId: id,
          status: "PENDING",
        },
      });

      if (pendingRequest) {
        throw new Error("There is already a pending edit request for this expense");
      }

      // Create edit request
      await prisma.expenseEditRequest.create({
        data: {
          expenseId: id,
          requestedById: context.userId,
          proposedChanges: input,
          status: "PENDING",
        },
      });

      // Update expense status to PENDING_EDIT
      return prisma.expense.update({
        where: { id },
        data: { status: "PENDING_EDIT" },
        include: {
          category: true,
          createdBy: true,
        },
      });
    },

    // Delete expense (soft delete)
    deleteExpense: async (_: any, { id }: { id: string }, context: any) => {
      checkAdminAccess(context);

      const expense = await prisma.expense.findUnique({ where: { id } });
      if (!expense) throw new Error("Expense not found");

      // For now, we'll just mark it as rejected_edit
      // You could add a deleted field if needed
      await prisma.expense.update({
        where: { id },
        data: { status: "REJECTED_EDIT" },
      });
      return true;
    },

    // Approve expense edit request
    approveExpenseEdit: async (_: any, { id }: { id: string }, context: any) => {
      checkAdminAccess(context);

      const editRequest = await prisma.expenseEditRequest.findUnique({
        where: { id },
        include: { expense: true },
      });

      if (!editRequest) throw new Error("Edit request not found");
      if (editRequest.status !== "PENDING") {
        throw new Error("Only pending edit requests can be approved");
      }

      const proposedChanges = editRequest.proposedChanges as any;

      // Update edit request status
      await prisma.expenseEditRequest.update({
        where: { id },
        data: {
          status: "APPROVED",
          reviewedById: context.userId,
          reviewedAt: new Date(),
        },
      });

      // Apply changes to expense
      return prisma.expense.update({
        where: { id: editRequest.expenseId },
        data: {
          ...proposedChanges,
          ...(proposedChanges.expenseDate && {
            expenseDate: new Date(proposedChanges.expenseDate),
          }),
          status: "APPROVED",
        },
        include: {
          category: true,
          createdBy: true,
        },
      });
    },

    // Reject expense edit request
    rejectExpenseEdit: async (
      _: any,
      { id, rejectionReason }: { id: string; rejectionReason?: string },
      context: any
    ) => {
      checkAdminAccess(context);

      const editRequest = await prisma.expenseEditRequest.findUnique({
        where: { id },
        include: { expense: true },
      });

      if (!editRequest) throw new Error("Edit request not found");
      if (editRequest.status !== "PENDING") {
        throw new Error("Only pending edit requests can be rejected");
      }

      // Update edit request status
      await prisma.expenseEditRequest.update({
        where: { id },
        data: {
          status: "REJECTED",
          reviewedById: context.userId,
          reviewedAt: new Date(),
          rejectionReason,
        },
      });

      // Update expense status back to REJECTED_EDIT
      return prisma.expense.update({
        where: { id: editRequest.expenseId },
        data: { status: "REJECTED_EDIT" },
        include: {
          category: true,
          createdBy: true,
        },
      });
    },
  },
};
