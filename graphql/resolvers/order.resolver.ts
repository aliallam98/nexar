import prisma from "../../lib/prisma";
import {
  generateOrderNumber,
  calculateDiscount,
  validateCoupon,
} from "@/lib/helpers";

export const orderResolver = {
  Query: {
    order: async (
      _: any,
      { id, orderNumber }: { id?: string; orderNumber?: string }
    ) => {
      if (id) {
        return prisma.order.findUnique({
          where: { id },
          include: { items: true, payments: true },
        });
      }
      if (orderNumber) {
        return prisma.order.findUnique({
          where: { orderNumber },
          include: { items: true, payments: true },
        });
      }
      return null;
    },

    orders: async (
      _: any,
      { page = 1, perPage = 10 }: { page?: number; perPage?: number },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");
      const skip = (page - 1) * perPage;

      return prisma.order.findMany({
        where: { userId: context.userId },
        skip,
        take: perPage,
        include: { items: true },
        orderBy: { createdAt: "desc" },
      });
    },

    ordersByStatus: async (
      _: any,
      {
        status,
        page = 1,
        perPage = 10,
      }: {
        status: string;
        page?: number;
        perPage?: number;
      }
    ) => {
      const skip = (page - 1) * perPage;

      return prisma.order.findMany({
        where: { status: status as any },
        skip,
        take: perPage,
        include: { items: true },
      });
    },

    userOrderHistory: async (
      _: any,
      { page = 1, perPage = 10 }: { page?: number; perPage?: number },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");
      const skip = (page - 1) * perPage;

      return prisma.order.findMany({
        where: { userId: context.userId },
        skip,
        take: perPage,
        include: { items: true, statusHistory: true },
        orderBy: { createdAt: "desc" },
      });
    },
  },

  Mutation: {
    createOrder: async (
      _: any,
      {
        items,
        shippingName,
        shippingPhone,
        shippingCountry,
        shippingCity,
        shippingStreet,
        shippingPostal,
        couponCode,
        customerNotes,
      }: any,
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      let subtotal = 0;
      let discount = 0;

      const orderItems = await Promise.all(
        items.map(async (item: any) => {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
          });
          if (!product) throw new Error(`Product ${item.productId} not found`);
          if (product.stock < item.quantity)
            throw new Error(`Insufficient stock for ${product.name}`);

          const itemTotal = product.price * item.quantity;
          subtotal += itemTotal;

          return {
            productId: item.productId,
            productName: product.name,
            productImage: product.images[0],
            quantity: item.quantity,
            price: product.price,
            total: itemTotal,
          };
        })
      );

      if (couponCode) {
        const coupon = await prisma.coupon.findUnique({
          where: { code: couponCode },
        });

        const validation = await validateCoupon(
          coupon,
          context.userId,
          subtotal,
          prisma
        );
        if (!validation.valid) throw new Error(validation.error);

        discount = calculateDiscount(coupon, subtotal);
      }

      const total = subtotal - discount;

      const order = await prisma.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: context.userId,
          shippingName,
          shippingPhone,
          shippingCountry,
          shippingCity,
          shippingStreet,
          shippingPostal,
          subtotal,
          discount,
          tax: 0,
          total,
          couponCode,
          customerNotes,
          items: {
            create: orderItems,
          },
          statusHistory: {
            create: {
              status: "PENDING",
              notes: "Order created",
            },
          },
        },
        include: { items: true },
      });

      // Decrease product stock
      await Promise.all(
        items.map((item: any) =>
          prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          })
        )
      );

      // Clear cart
      await prisma.cartItem.deleteMany({ where: { userId: context.userId } });

      return order;
    },

    cancelOrder: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      const order = await prisma.order.findUnique({
        where: { id },
        include: { items: true },
      });
      if (!order) throw new Error("Order not found");
      if (order.userId !== context.userId && context.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      // Return stock
      await Promise.all(
        order.items.map((item) =>
          prisma.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          })
        )
      );

      return prisma.order.update({
        where: { id },
        data: {
          status: "CANCELLED",
          statusHistory: {
            create: { status: "CANCELLED", notes: "Order cancelled" },
          },
        },
        include: { items: true },
      });
    },

    updateOrderStatus: async (
      _: any,
      { id, status }: { id: string; status: string }
    ) => {
      return prisma.order.update({
        where: { id },
        data: {
          status: status as any,
          statusHistory: {
            create: {
              status: status as any,
              notes: `Status updated to ${status}`,
            },
          },
        },
        include: { items: true },
      });
    },
  },
};
