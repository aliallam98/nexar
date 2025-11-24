import { prisma } from "@/lib/prisma";

export const addressResolver = {
  Query: {
    address: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      const address = await prisma.address.findUnique({ where: { id } });
      if (address?.userId !== context.userId) throw new Error("Unauthorized");

      return address;
    },

    addresses: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      return prisma.address.findMany({
        where: { userId: context.userId },
        orderBy: { isDefault: "desc" },
      });
    },
  },

  Mutation: {
    createAddress: async (
      _: any,
      { label, fullName, phone, country, city, street, postalCode }: any,
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      return prisma.address.create({
        data: {
          label,
          fullName,
          phone,
          country,
          city,
          street,
          postalCode,
          userId: context.userId,
        },
      });
    },

    updateAddress: async (
      _: any,
      { id, label, fullName, phone, country, city, street }: any,
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      const address = await prisma.address.findUnique({ where: { id } });
      if (address?.userId !== context.userId) throw new Error("Unauthorized");

      return prisma.address.update({
        where: { id },
        data: {
          ...(label && { label }),
          ...(fullName && { fullName }),
          ...(phone && { phone }),
          ...(country && { country }),
          ...(city && { city }),
          ...(street && { street }),
        },
      });
    },

    deleteAddress: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      const address = await prisma.address.findUnique({ where: { id } });
      if (address?.userId !== context.userId) throw new Error("Unauthorized");

      await prisma.address.delete({ where: { id } });
      return true;
    },

    setDefaultAddress: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      const address = await prisma.address.findUnique({ where: { id } });
      if (address?.userId !== context.userId) throw new Error("Unauthorized");

      await prisma.address.updateMany({
        where: { userId: context.userId },
        data: { isDefault: false },
      });

      return prisma.address.update({
        where: { id },
        data: { isDefault: true },
      });
    },
  },
};
