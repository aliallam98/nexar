import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  # User type is defined in product.typedefs.ts or other module files
  # Role enum is defined in base typedefs

  type AuthPayload {
    token: String!
    user: User!
  }

  type LogoutPayload {
    success: Boolean!
    message: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    register(
      email: String!
      password: String!
      name: String
      gender: String
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: LogoutPayload!
    updateProfile(name: String, phone: String, image: String): User!
    changePassword(oldPassword: String!, newPassword: String!): User!
    deleteAccount: LogoutPayload!
  }
`;
