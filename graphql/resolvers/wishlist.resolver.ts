import { prisma } from "@/lib/prisma";

export const wishlistResolver = {
  Query: {
    wishlist: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      const wishlists = await prisma.wishlist.findMany({
        where: { userId: context.userId },
        include: { product: true },
      });

      return wishlists.map((w) => w.product);
    },

    wishlistItemCount: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      return prisma.wishlist.count({ where: { userId: context.userId } });
    },
  },

  Mutation: {
    addToWishlist: async (
      _: any,
      { productId }: { productId: string },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) throw new Error("Product not found");

      await prisma.wishlist.upsert({
        where: { userId_productId: { userId: context.userId, productId } },
        update: {},
        create: { userId: context.userId, productId },
      });

      return product;
    },

    removeFromWishlist: async (
      _: any,
      { productId }: { productId: string },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      await prisma.wishlist.delete({
        where: { userId_productId: { userId: context.userId, productId } },
      });

      return true;
    },

    moveToCart: async (
      _: any,
      { productId }: { productId: string },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) throw new Error("Product not found");

      await prisma.cartItem.upsert({
        where: { userId_productId: { userId: context.userId, productId } },
        update: { quantity: { increment: 1 } },
        create: {
          userId: context.userId,
          productId,
          quantity: 1,
          price: product.price,
        },
      });

      await prisma.wishlist.delete({
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
  },
};
