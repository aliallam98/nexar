import { gql } from "graphql-tag"

export const addressTypeDefs = gql`
  type Address {
    id: ID!
    label: String
    fullName: String!
    phone: String!
    country: String!
    city: String!
    street: String!
    postalCode: String
    isDefault: Boolean!
    createdAt: String!
  }

  extend type Query {
    address(id: ID!): Address
    addresses: [Address!]!
  }

  extend type Mutation {
    createAddress(
      label: String
      fullName: String!
      phone: String!
      country: String!
      city: String!
      street: String!
      postalCode: String
    ): Address!
    
    updateAddress(
      id: ID!
      label: String
      fullName: String
      phone: String
      country: String
      city: String
      street: String
    ): Address!
    
    deleteAddress(id: ID!): Boolean!
    setDefaultAddress(id: ID!): Address!
  }
`
