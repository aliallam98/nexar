import prisma from "@/lib/prisma";

export const contactRequestResolvers = {
  Query: {
    contactRequest: async (_: unknown, { id }: { id: string }) => {
      return await prisma.contactRequest.findUnique({
        where: { id },
        include: {
          assignedTo: true,
        },
      });
    },

    contactRequests: async (
      _: unknown,
      {
        filters,
        skip = 0,
        take = 20,
      }: {
        filters?: {
          status?: string;
          assignedToId?: string;
          search?: string;
        };
        skip?: number;
        take?: number;
      }
    ) => {
      const where: any = {};

      if (filters?.status) {
        where.status = filters.status;
      }

      if (filters?.assignedToId) {
        where.assignedToId = filters.assignedToId;
      }

      if (filters?.search) {
        where.OR = [
          { name: { contains: filters.search, mode: "insensitive" } },
          { phone: { contains: filters.search, mode: "insensitive" } },
          { message: { contains: filters.search, mode: "insensitive" } },
        ];
      }

      const [items, total] = await Promise.all([
        prisma.contactRequest.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: "desc" },
          include: {
            assignedTo: true,
          },
        }),
        prisma.contactRequest.count({ where }),
      ]);

      return {
        items,
        total,
        hasMore: skip + items.length < total,
      };
    },

    contactRequestStats: async () => {
      const [total, newCount, inProgress, resolved, archived] = await Promise.all([
        prisma.contactRequest.count(),
        prisma.contactRequest.count({ where: { status: "NEW" } }),
        prisma.contactRequest.count({ where: { status: "IN_PROGRESS" } }),
        prisma.contactRequest.count({ where: { status: "RESOLVED" } }),
        prisma.contactRequest.count({ where: { status: "ARCHIVED" } }),
      ]);

      return {
        total,
        new: newCount,
        inProgress,
        resolved,
        archived,
      };
    },
  },

  Mutation: {
    createContactRequest: async (
      _: unknown,
      {
        input,
      }: {
        input: {
          name: string;
          category: string;
          phone: string;
          message: string;
        };
      }
    ) => {
      return await prisma.contactRequest.create({
        data: {
          name: input.name,
          category: input.category,
          phone: input.phone,
          message: input.message,
          status: "NEW",
        },
      });
    },

    updateContactRequestStatus: async (
      _: unknown,
      { input }: { input: { id: string; status: string } }
    ) => {
      return await prisma.contactRequest.update({
        where: { id: input.id },
        data: { status: input.status as any },
        include: {
          assignedTo: true,
        },
      });
    },

    assignContactRequest: async (
      _: unknown,
      { input }: { input: { id: string; assignedToId: string } }
    ) => {
      return await prisma.contactRequest.update({
        where: { id: input.id },
        data: { assignedToId: input.assignedToId },
        include: {
          assignedTo: true,
        },
      });
    },

    addContactRequestNotes: async (
      _: unknown,
      { input }: { input: { id: string; notes: string } }
    ) => {
      return await prisma.contactRequest.update({
        where: { id: input.id },
        data: { notes: input.notes },
        include: {
          assignedTo: true,
        },
      });
    },

    deleteContactRequest: async (_: unknown, { id }: { id: string }) => {
      await prisma.contactRequest.delete({
        where: { id },
      });
      return true;
    },
  },
};
