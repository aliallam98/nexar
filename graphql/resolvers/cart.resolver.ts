import prisma from "../../lib/prisma";

export const cartResolver = {
  Query: {
    cart: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      const items = await prisma.cartItem.findMany({
        where: { userId: context.userId },
        include: { product: true },
      });

      const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      return {
        items,
        subtotal,
        itemCount: items.length,
      };
    },

    cartItemCount: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      return prisma.cartItem.count({ where: { userId: context.userId } });
    },
  },

  Mutation: {
    addToCart: async (
      _: any,
      { productId, quantity }: { productId: string; quantity: number },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) throw new Error("Product not found");
      if (product.stock < quantity) throw new Error("Insufficient stock");

      await prisma.cartItem.upsert({
        where: { userId_productId: { userId: context.userId, productId } },
        update: { quantity: { increment: quantity } },
        create: {
          userId: context.userId,
          productId,
          quantity,
          price: product.price,
        },
      });

      const items = await prisma.cartItem.findMany({
        where: { userId: context.userId },
        include: { product: true },
      });

      const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      return { items, subtotal, itemCount: items.length };
    },

    updateCartItem: async (
      _: any,
      { productId, quantity }: { productId: string; quantity: number },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");
      if (quantity <= 0) throw new Error("Quantity must be greater than 0");

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) throw new Error("Product not found");
      if (product.stock < quantity) throw new Error("Insufficient stock");

      await prisma.cartItem.update({
        where: { userId_productId: { userId: context.userId, productId } },
        data: { quantity },
      });

      const items = await prisma.cartItem.findMany({
        where: { userId: context.userId },
        include: { product: true },
      });

      const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      return { items, subtotal, itemCount: items.length };
    },

    removeFromCart: async (
      _: any,
      { productId }: { productId: string },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      await prisma.cartItem.delete({
        where: { userId_productId: { userId: context.userId, productId } },
      });

      const items = await prisma.cartItem.findMany({
        where: { userId: context.userId },
        include: { product: true },
      });

      const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      return { items, subtotal, itemCount: items.length };
    },

    clearCart: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      await prisma.cartItem.deleteMany({
        where: { userId: context.userId },
      });

      return true;
    },
  },
};
