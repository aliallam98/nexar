import { gql } from "graphql-tag"

export const cartTypeDefs = gql`
  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
    price: Float!
    total: Float!
  }

  type Cart {
    items: [CartItem!]!
    subtotal: Float!
    itemCount: Int!
  }

  extend type Query {
    cart: Cart!
    cartItemCount: Int!
  }

  extend type Mutation {
    addToCart(productId: ID!, quantity: Int!): Cart!
    updateCartItem(productId: ID!, quantity: Int!): Cart!
    removeFromCart(productId: ID!): Cart!
    clearCart: Boolean!
  }
`
