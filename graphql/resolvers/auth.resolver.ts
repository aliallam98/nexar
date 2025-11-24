import { hashPassword, verifyPassword } from "../../lib/auth";
import { generateToken } from "../../lib/jwt";
import prisma from "../../lib/prisma";
import { cookies } from "next/headers";

export const authResolver = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");
      return prisma.user.findUnique({ where: { id: context.userId } });
    },

    user: async (_: any, { id }: { id: string }) => {
      return prisma.user.findUnique({ where: { id } });
    },

    users: async (
      _: any,
      { limit = 10, offset = 0 }: { limit?: number; offset?: number }
    ) => {
      return prisma.user.findMany({
        take: limit,
        skip: offset,
      });
    },
  },

  Mutation: {
    register: async (
      _: any,
      {
        email,
        password,
        name,
        gender,
      }: { email: string; password: string; name?: string; gender?: string }
    ) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("Email already registered");

      const hashedPassword = await hashPassword(password);

      const profilePicture = gender
        ? gender === "male"
          ? `https://avatar.iran.liara.run/public/boy?username=${email}`
          : `https://avatar.iran.liara.run/public/girl?username=${email}`
        : undefined;

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          ...(profilePicture && { image: profilePicture }),
        },
      });

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      return { token, user };
    },

    login: async (
      _: any,
      { email, password }: { email: string; password: string },
      context: any
    ) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("Invalid credentials");

      const validPassword = await verifyPassword(password, user.password);
      if (!validPassword) throw new Error("Invalid credentials");

      if (!user.isActive) throw new Error("Account is inactive");

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      const cookieStore = await cookies();

      cookieStore.set({
        name: "authToken",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return { token, user };
    },

    logout: async (_: any, __: any, context: any) => {
      context.res?.setHeader(
        "Set-Cookie",
        "authToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"
      );
      return { success: true, message: "Logged out successfully" };
    },

    updateProfile: async (
      _: any,
      { name, phone, image }: { name?: string; phone?: string; image?: string },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      return prisma.user.update({
        where: { id: context.userId },
        data: {
          ...(name && { name }),
          ...(phone && { phone }),
          ...(image && { image }),
        },
      });
    },

    changePassword: async (
      _: any,
      {
        oldPassword,
        newPassword,
      }: { oldPassword: string; newPassword: string },
      context: any
    ) => {
      if (!context.userId) throw new Error("Unauthorized");

      const user = await prisma.user.findUnique({
        where: { id: context.userId },
      });
      if (!user) throw new Error("User not found");

      const validPassword = await verifyPassword(oldPassword, user.password);
      if (!validPassword) throw new Error("Old password is incorrect");

      const hashedPassword = await hashPassword(newPassword);
      return prisma.user.update({
        where: { id: context.userId },
        data: { password: hashedPassword },
      });
    },

    deleteAccount: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      await prisma.user.update({
        where: { id: context.userId },
        data: { isActive: false },
      });

      context.res?.setHeader(
        "Set-Cookie",
        "authToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"
      );

      return { success: true, message: "Account deleted successfully" };
    },
  },
};
