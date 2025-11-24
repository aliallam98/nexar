import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    slug: String!
    description: String
    price: Float!
    comparePrice: Float
    stock: Int!
    sku: String
    images: [String!]!
    weight: Float
    dimensions: String
    isFeatured: Boolean!
    isActive: Boolean!
    metaTitle: String
    metaDescription: String
    category: Category!
    brand: Brand
    variants: [ProductVariant!]!
    reviews: [Review!]!
    createdAt: String!
    updatedAt: String!
  }

  type ProductVariant {
    id: ID!
    name: String!
    sku: String
    price: Float
    stock: Int!
    attributes: JSON!
    isActive: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    image: String
    description: String
    isActive: Boolean!
    parentId: String
    children: [Category!]!
    createdAt: String!
    updatedAt: String!
  }

  type Brand {
    id: ID!
    name: String!
    slug: String!
    image: String
    description: String
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type PaginatedProducts {
    data: [Product!]!
    paginationDetails: PaginationDetails!
  }

  type CategoriesResponse {
    data: [Category!]!
    paginationDetails: PaginationDetails!
  }

  type BrandsResponse {
    data: [Brand!]!
    paginationDetails: PaginationDetails!
  }

  # Input Types
  input CreateProductInput {
    name: String!
    slug: String
    description: String
    price: Float!
    comparePrice: Float
    stock: Int!
    sku: String
    categoryId: String!
    brandId: String
    images: [String!]!
    weight: Float
    dimensions: String
    isFeatured: Boolean
    metaTitle: String
    metaDescription: String
  }

  input UpdateProductInput {
    name: String
    slug: String
    description: String
    price: Float
    comparePrice: Float
    stock: Int
    sku: String
    categoryId: String
    brandId: String
    images: [String!]
    weight: Float
    dimensions: String
    isFeatured: Boolean
    metaTitle: String
    metaDescription: String
  }

  input CreateCategoryInput {
    name: String!
    slug: String
    description: String
    image: String
    parentId: String
  }

  input UpdateCategoryInput {
    name: String
    slug: String
    description: String
    image: String
    parentId: String
  }

  input CreateBrandInput {
    name: String!
    slug: String
    description: String
    image: String
  }

  input UpdateBrandInput {
    name: String
    slug: String
    description: String
    image: String
  }

  extend type Query {
    # Product Queries
    product(id: ID, slug: String): Product
    products(
      pagination: PaginationInput
      categoryId: String
      brandId: String
    ): PaginatedProducts!
    featuredProducts(limit: Int): [Product!]!
    productsByCategory(
      categoryId: String!
      pagination: PaginationInput
    ): PaginatedProducts!
    productsByBrand(
      brandId: String!
      pagination: PaginationInput
    ): PaginatedProducts!
    searchProducts(
      query: String!
      pagination: PaginationInput
    ): PaginatedProducts!
    relatedProducts(productId: ID!, limit: Int): [Product!]!
    productVariants(productId: ID!): [ProductVariant!]!

    # Category Queries
    category(id: ID, slug: String): Category
    categories(pagination: PaginationInput): CategoriesResponse!
    categoriesDropdown: [Category!]! # New: Get all categories without pagination
    # Brand Queries
    brand(id: ID, slug: String): Brand
    brands(pagination: PaginationInput): BrandsResponse!
    brandsDropdown: [Brand!]! # New: Get all brands without pagination
  }

  extend type Mutation {
    # Product Mutations
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean! # Now performs soft delete
    toggleProductStatus(id: ID!): Product!

    # Category Mutations
    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): Boolean! # Now performs soft delete
    toggleCategoryStatus(id: ID!): Category!

    # Brand Mutations
    createBrand(input: CreateBrandInput!): Brand!
    updateBrand(id: ID!, input: UpdateBrandInput!): Brand!
    deleteBrand(id: ID!): Boolean! # Now performs soft delete
    toggleBrandStatus(id: ID!): Brand!
  }
`;
