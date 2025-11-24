import { prisma } from "@/lib/prisma";

export const reviewResolver = {
  Query: {
    review: async (_: any, { id }: { id: string }) => {
      return prisma.review.findUnique({
        where: { id },
        include: { user: true, product: true },
      });
    },

    productReviews: async (
      _: any,
      {
        productId,
        page = 1,
        perPage = 10,
      }: {
        productId: string;
        page?: number;
        perPage?: number;
      }
    ) => {
      const skip = (page - 1) * perPage;

      return prisma.review.findMany({
        where: { productId, isApproved: true },
        skip,
        take: perPage,
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
    },

    reviews: async (
      _: any,
      { page = 1, perPage = 10 }: { page?: number; perPage?: number }
    ) => {
      const skip = (page - 1) * perPage;

      return prisma.review.findMany({
        skip,
        take: perPage,
        include: { user: true, product: true },
        orderBy: { createdAt: "desc" },
      });
    },
  },

  Mutation: {
    createReview: async (
      _: any,
      { productId, rating, title, comment, images }: any,
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      return prisma.review.create({
        data: {
          productId,
          userId: context.userId,
          rating,
          title,
          comment,
          images: images || [],
          isVerifiedPurchase: true,
        },
        include: { user: true, product: true },
      });
    },

    updateReview: async (
      _: any,
      { id, rating, comment, images }: any,
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      const review = await prisma.review.findUnique({ where: { id } });
      if (review?.userId !== context.userId) throw new Error("Unauthorized");

      return prisma.review.update({
        where: { id },
        data: {
          ...(rating && { rating }),
          ...(comment && { comment }),
          ...(images && { images }),
        },
        include: { user: true, product: true },
      });
    },

    deleteReview: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      const review = await prisma.review.findUnique({ where: { id } });
      if (review?.userId !== context.userId) throw new Error("Unauthorized");

      await prisma.review.delete({ where: { id } });
      return true;
    },

    approveReview: async (
      _: any,
      { id, approved }: { id: string; approved: boolean }
    ) => {
      return prisma.review.update({
        where: { id },
        data: { isApproved: approved },
        include: { user: true, product: true },
      });
    },
  },
};
