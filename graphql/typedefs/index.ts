import { mergeTypeDefs } from "@graphql-tools/merge"
import { gql } from "graphql-tag"
import { authTypeDefs } from "./auth.typedefs"
import { productTypeDefs } from "./product.typedefs"
import { cartTypeDefs } from "./cart.typedefs"
import { orderTypeDefs } from "./order.typedefs"
import { wishlistTypeDefs } from "./wishlist.typedefs"
import { couponTypeDefs } from "./coupon.typedefs"
import { reviewTypeDefs } from "./review.typedefs"
import { addressTypeDefs } from "./address.typedefs"
import transactionTypeDefs from "./transaction.typedefs"
import { userTypeDefs } from "./user.typedefs"
import { expenseTypeDefs } from "./expense.typedefs"

const baseTypeDefs = gql`
  type Query {
    health: String!
  }

  type Mutation {
    _empty: String
  }

  scalar JSON

  # Shared Enums
  enum Role {
    CUSTOMER
    ADMIN
  }

  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
    REFUNDED
  }

  enum DiscountType {
    PERCENTAGE
    FIXED
  }

  # Pagination
  input PaginationInput {
    page: Int
    perPage: Int
  }

  type PaginationDetails {
    currentPage: Int!
    perPage: Int!
    totalPages: Int!
    totalItems: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
`

export const mergedTypeDefs = mergeTypeDefs([
  baseTypeDefs,
  authTypeDefs,
  productTypeDefs,
  cartTypeDefs,
  orderTypeDefs,
  wishlistTypeDefs,
  couponTypeDefs,
  reviewTypeDefs,
  addressTypeDefs,
  transactionTypeDefs,
  userTypeDefs,
  expenseTypeDefs,
])
