import { prisma } from "@/lib/prisma";
import { calculateDiscount, validateCoupon } from "@/lib/helpers";

export const couponResolver = {
  Query: {
    coupon: async (_: any, { code }: { code: string }) => {
      return prisma.coupon.findUnique({ where: { code } });
    },

    validateCoupon: async (
      _: any,
      { code, orderTotal }: { code: string; orderTotal: number },
      context: any
    ) => {
      const coupon = await prisma.coupon.findUnique({ where: { code } });

      const validation = await validateCoupon(
        coupon,
        context.userId || "",
        orderTotal,
        prisma
      );

      if (!validation.valid) {
        return { valid: false, error: validation.error };
      }

      const discount = calculateDiscount(coupon, orderTotal);

      return { valid: true, coupon, discount };
    },

    coupons: async (
      _: any,
      { page = 1, perPage = 10 }: { page?: number; perPage?: number }
    ) => {
      const skip = (page - 1) * perPage;

      return prisma.coupon.findMany({
        skip,
        take: perPage,
        where: { isActive: true },
      });
    },
  },

  Mutation: {
    createCoupon: async (
      _: any,
      {
        code,
        description,
        discountType,
        discountValue,
        minPurchase,
        maxDiscount,
        maxUseCount,
        maxUsePerUser,
        startsAt,
        expiresAt,
      }: any
    ) => {
      return prisma.coupon.create({
        data: {
          code,
          description,
          discountType,
          discountValue,
          minPurchase,
          maxDiscount,
          maxUseCount,
          maxUsePerUser,
          startsAt: startsAt ? new Date(startsAt) : null,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
        },
      });
    },

    updateCoupon: async (
      _: any,
      {
        id,
        code,
        discountValue,
        expiresAt,
      }: {
        id: string;
        code?: string;
        discountValue?: number;
        expiresAt?: string;
      }
    ) => {
      return prisma.coupon.update({
        where: { id },
        data: {
          ...(code && { code }),
          ...(discountValue && { discountValue }),
          ...(expiresAt && { expiresAt: new Date(expiresAt) }),
        },
      });
    },

    deleteCoupon: async (_: any, { id }: { id: string }) => {
      await prisma.coupon.delete({ where: { id } });
      return true;
    },

    toggleCouponStatus: async (_: any, { id }: { id: string }) => {
      const coupon = await prisma.coupon.findUnique({ where: { id } });
      return prisma.coupon.update({
        where: { id },
        data: { isActive: !coupon?.isActive },
      });
    },

    applyCoupon: async (
      _: any,
      { couponCode }: { couponCode: string },
      context: any
    ) => {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
      });

      if (!coupon || !coupon.isActive) {
        return { valid: false, error: "Invalid coupon" };
      }

      const discount = calculateDiscount(coupon, 0);

      return { valid: true, coupon, discount };
    },
  },
};
