import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    phone: String
    image: String
    role: Role!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  # Input Types
  input CreateUserInput {
    email: String!
    password: String!
    name: String
    phone: String
    image: String
    role: Role!
  }

  input UpdateUserInput {
    name: String
    phone: String
    image: String
    isActive: Boolean
  }

  # Paginated response
  type PaginatedUsers {
    data: [User!]!
    paginationDetails: PaginationDetails!
  }

  extend type Query {
    # Get single user by ID
    user(id: ID!): User

    # List all users with pagination and optional role filter
    users(pagination: PaginationInput, role: Role): PaginatedUsers!

    # List customers only (role = CUSTOMER)
    customers(pagination: PaginationInput): PaginatedUsers!

    # List staff only (role = ADMIN)
    staff(pagination: PaginationInput): PaginatedUsers!
  }

  extend type Mutation {
    # Create user (can be customer or staff)
    createUser(input: CreateUserInput!): User!

    # Update user
    updateUser(id: ID!, input: UpdateUserInput!): User!

    # Soft delete user (toggle isActive)
    deleteUser(id: ID!): Boolean!

    # Toggle user active status
    toggleUserStatus(id: ID!): User!
  }
`;
