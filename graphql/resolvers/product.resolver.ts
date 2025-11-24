import prisma from "../../lib/prisma";
import slugify from "slugify";

// Slug generation helper function
const generateSlug = (text: string): string => {
  const hasArabic = /[\u0600-\u06FF]/.test(text);

  if (hasArabic) {
    return text.trim().replace(/\s+/g, "-");
  }

  return slugify(text, {
    lower: true,
    strict: false,
    trim: true,
    replacement: "-",
  });
};

// Pagination helper function
const calculatePaginationDetails = (
  total: number,
  page: number,
  perPage: number,
  currentItemsCount: number
) => {
  const lastPage = Math.ceil(total / perPage);
  return {
    currentPageItemsCount: currentItemsCount,
    total,
    itemsPerPage: perPage,
    currentPage: page,
    lastPage,
    hasMorePages: page < lastPage,
  };
};

export const productResolver = {
  Query: {
    // Get single product by id or slug
    product: async (_: any, { id, slug }: { id?: string; slug?: string }) => {
      if (id) {
        return prisma.product.findUnique({
          where: { id },
          include: { category: true, brand: true, variants: true },
        });
      }
      if (slug) {
        return prisma.product.findUnique({
          where: { slug },
          include: { category: true, brand: true, variants: true },
        });
      }
      return null;
    },

    // Get paginated products with optional filters
    products: async (
      _: any,
      {
        pagination = { page: 1, perPage: 20 },
        categoryId,
        brandId,
      }: {
        pagination?: { page?: number; perPage?: number };
        categoryId?: string;
        brandId?: string;
      }
    ) => {
      const { page = 1, perPage = 20 } = pagination;
      const skip = (page - 1) * perPage;

      const where = {
        isActive: true,
        ...(categoryId && { categoryId }),
        ...(brandId && { brandId }),
      };

      const [data, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: perPage,
          include: { category: true, brand: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.product.count({ where }),
      ]);

      return {
        data,
        paginationDetails: calculatePaginationDetails(
          total,
          page,
          perPage,
          data.length
        ),
      };
    },

    // Get featured products (no pagination)
    featuredProducts: async (_: any, { limit = 10 }: { limit?: number }) => {
      return prisma.product.findMany({
        where: { isFeatured: true, isActive: true },
        take: limit,
        include: { category: true, brand: true },
        orderBy: { createdAt: "desc" },
      });
    },

    // Get paginated products by category
    productsByCategory: async (
      _: any,
      {
        categoryId,
        pagination = { page: 1, perPage: 20 },
      }: {
        categoryId: string;
        pagination?: { page?: number; perPage?: number };
      }
    ) => {
      const { page = 1, perPage = 20 } = pagination;
      const skip = (page - 1) * perPage;

      const where = { categoryId, isActive: true };

      const [data, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: perPage,
          include: { category: true, brand: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.product.count({ where }),
      ]);

      return {
        data,
        paginationDetails: calculatePaginationDetails(
          total,
          page,
          perPage,
          data.length
        ),
      };
    },

    // Get paginated products by brand
    productsByBrand: async (
      _: any,
      {
        brandId,
        pagination = { page: 1, perPage: 20 },
      }: {
        brandId: string;
        pagination?: { page?: number; perPage?: number };
      }
    ) => {
      const { page = 1, perPage = 20 } = pagination;
      const skip = (page - 1) * perPage;

      const where = { brandId, isActive: true };

      const [data, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: perPage,
          include: { category: true, brand: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.product.count({ where }),
      ]);

      return {
        data,
        paginationDetails: calculatePaginationDetails(
          total,
          page,
          perPage,
          data.length
        ),
      };
    },

    // Search products with pagination
    searchProducts: async (
      _: any,
      {
        query,
        pagination = { page: 1, perPage: 20 },
      }: {
        query: string;
        pagination?: { page?: number; perPage?: number };
      }
    ) => {
      const { page = 1, perPage = 20 } = pagination;
      const skip = (page - 1) * perPage;

      const where = {
        isActive: true,
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { description: { contains: query, mode: "insensitive" as const } },
        ],
      };

      const [data, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: perPage,
          include: { category: true, brand: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.product.count({ where }),
      ]);

      return {
        data,
        paginationDetails: calculatePaginationDetails(
          total,
          page,
          perPage,
          data.length
        ),
      };
    },

    // Get related products (no pagination)
    relatedProducts: async (
      _: any,
      { productId, limit = 5 }: { productId: string; limit?: number }
    ) => {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) return [];

      return prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: productId },
          isActive: true,
        },
        take: limit,
        include: { category: true, brand: true },
      });
    },

    // Get single category by id or slug
    category: async (_: any, { id, slug }: { id?: string; slug?: string }) => {
      if (id) {
        return prisma.category.findUnique({
          where: { id },
          include: { children: true },
        });
      }
      if (slug) {
        return prisma.category.findUnique({
          where: { slug },
          include: { children: true },
        });
      }
      return null;
    },

    // Get paginated categories (root level only)
    categories: async (
      _: any,
      {
        pagination = { page: 1, perPage: 20 },
      }: {
        pagination?: { page?: number; perPage?: number };
      }
    ) => {
      const { page = 1, perPage = 20 } = pagination;
      const skip = (page - 1) * perPage;

      const where = { isActive: true, parentId: null };

      const [data, total] = await Promise.all([
        prisma.category.findMany({
          where,
          skip,
          take: perPage,
          include: { children: true },
          orderBy: { name: "asc" },
        }),
        prisma.category.count({ where }),
      ]);

      return {
        data,
        paginationDetails: calculatePaginationDetails(
          total,
          page,
          perPage,
          data.length
        ),
      };
    },

    // Get all categories for dropdown (no pagination)
    categoriesDropdown: async (_: any) => {
      return prisma.category.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        include: { children: true },
      });
    },

    // Get single brand by id or slug
    brand: async (_: any, { id, slug }: { id?: string; slug?: string }) => {
      if (id) return prisma.brand.findUnique({ where: { id } });
      if (slug) return prisma.brand.findUnique({ where: { slug } });
      return null;
    },

    // Get paginated brands
    brands: async (
      _: any,
      {
        pagination = { page: 1, perPage: 20 },
      }: {
        pagination?: { page?: number; perPage?: number };
      }
    ) => {
      const { page = 1, perPage = 20 } = pagination;
      const skip = (page - 1) * perPage;

      const where = { isActive: true };

      const [data, total] = await Promise.all([
        prisma.brand.findMany({
          where,
          skip,
          take: perPage,
          orderBy: { name: "asc" },
        }),
        prisma.brand.count({ where }),
      ]);

      return {
        data,
        paginationDetails: calculatePaginationDetails(
          total,
          page,
          perPage,
          data.length
        ),
      };
    },

    // Get all brands for dropdown (no pagination)
    brandsDropdown: async (_: any) => {
      return prisma.brand.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
      });
    },
  },

  Mutation: {
    // Create product with input object
    createProduct: async (_: any, { input }: { input: any }) => {
      // Auto-generate slug if not provided
      const slug = input.slug || generateSlug(input.name);

      return prisma.product.create({
        data: {
          ...input,
          slug,
        },
        include: { category: true, brand: true },
      });
    },

    // Update product with input object
    updateProduct: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      // Auto-generate slug if name is updated but slug is not provided
      const updateData = { ...input };
      if (input.name && !input.slug) {
        updateData.slug = generateSlug(input.name);
      }

      return prisma.product.update({
        where: { id },
        data: updateData,
        include: { category: true, brand: true },
      });
    },

    // Soft delete product (set isActive to false)
    deleteProduct: async (_: any, { id }: { id: string }) => {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new Error("Product not found");
      }

      await prisma.product.update({
        where: { id },
        data: { isActive: false },
      });
      return true;
    },

    // Toggle product active status
    toggleProductStatus: async (_: any, { id }: { id: string }) => {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) throw new Error("Product not found");

      return prisma.product.update({
        where: { id },
        data: { isActive: !product.isActive },
        include: { category: true, brand: true },
      });
    },

    // Create category with input object
    createCategory: async (_: any, { input }: { input: any }) => {
      // Check if name already exists
      const existing = await prisma.category.findFirst({
        where: { name: input.name },
      });
      if (existing) {
        throw new Error("Category with this name already exists");
      }

      // Auto-generate slug if not provided
      const slug = input.slug || generateSlug(input.name);

      return prisma.category.create({
        data: {
          ...input,
          slug,
        },
        include: { children: true },
      });
    },

    // Update category with input object
    updateCategory: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      // Check if category exists
      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) {
        throw new Error("Category not found");
      }

      // Check if name is being updated and if it conflicts with another category
      if (input.name) {
        const existing = await prisma.category.findFirst({
          where: {
            name: input.name,
            id: { not: id },
          },
        });
        if (existing) {
          throw new Error("Another category with this name already exists");
        }
      }

      // Auto-generate slug if name is updated but slug is not provided
      const updateData = { ...input };
      if (input.name && !input.slug) {
        updateData.slug = generateSlug(input.name);
      }

      return prisma.category.update({
        where: { id },
        data: updateData,
        include: { children: true },
      });
    },

    // Soft delete category (set isActive to false)
    deleteCategory: async (_: any, { id }: { id: string }) => {
      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) {
        throw new Error("Category not found");
      }

      await prisma.category.update({
        where: { id },
        data: { isActive: false },
      });
      return true;
    },

    // Toggle category active status
    toggleCategoryStatus: async (_: any, { id }: { id: string }) => {
      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) throw new Error("Category not found");

      return prisma.category.update({
        where: { id },
        data: { isActive: !category.isActive },
        include: { children: true },
      });
    },

    // Create brand with input object
    createBrand: async (_: any, { input }: { input: any }) => {
      // Check if name already exists
      const existing = await prisma.brand.findFirst({
        where: { name: input.name },
      });
      if (existing) {
        throw new Error("Brand with this name already exists");
      }

      // Auto-generate slug if not provided
      const slug = input.slug || generateSlug(input.name);

      return prisma.brand.create({
        data: {
          ...input,
          slug,
        },
      });
    },

    // Update brand with input object
    updateBrand: async (_: any, { id, input }: { id: string; input: any }) => {
      // Check if brand exists
      const brand = await prisma.brand.findUnique({ where: { id } });
      if (!brand) {
        throw new Error("Brand not found");
      }

      // Check if name is being updated and if it conflicts with another brand
      if (input.name) {
        const existing = await prisma.brand.findFirst({
          where: {
            name: input.name,
            id: { not: id },
          },
        });
        if (existing) {
          throw new Error("Another brand with this name already exists");
        }
      }

      // Auto-generate slug if name is updated but slug is not provided
      const updateData = { ...input };
      if (input.name && !input.slug) {
        updateData.slug = generateSlug(input.name);
      }

      return prisma.brand.update({
        where: { id },
        data: updateData,
      });
    },

    // Soft delete brand (set isActive to false)
    deleteBrand: async (_: any, { id }: { id: string }) => {
      const brand = await prisma.brand.findUnique({ where: { id } });
      if (!brand) {
        throw new Error("Brand not found");
      }

      await prisma.brand.update({
        where: { id },
        data: { isActive: false },
      });
      return true;
    },

    // Toggle brand active status
    toggleBrandStatus: async (_: any, { id }: { id: string }) => {
      const brand = await prisma.brand.findUnique({ where: { id } });
      if (!brand) throw new Error("Brand not found");

      return prisma.brand.update({
        where: { id },
        data: { isActive: !brand.isActive },
      });
    },
  },
};
