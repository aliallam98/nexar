import { gql } from "graphql-tag"

export const wishlistTypeDefs = gql`
  extend type Query {
    wishlist: [Product!]!
    wishlistItemCount: Int!
  }

  extend type Mutation {
    addToWishlist(productId: ID!): Product!
    removeFromWishlist(productId: ID!): Boolean!
    moveToCart(productId: ID!): Cart!
  }
`
