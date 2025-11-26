import { mergeTypeDefs } from "@graphql-tools/merge"
import { gql } from "graphql-tag"
import { authTypeDefs } from "./auth.typedefs"
import { userTypeDefs } from "./user.typedefs"
import { expenseTypeDefs } from "./expense.typedefs"
import { contactRequestTypeDefs } from "../schemas/contactRequest.schema"

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
    ADMIN
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
  userTypeDefs,
  expenseTypeDefs,
  contactRequestTypeDefs,
])
