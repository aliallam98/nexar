import { gql } from "graphql-tag"

export const orderTypeDefs = gql`
  type Order {
    id: ID!
    orderNumber: String!
    status: OrderStatus!
    subtotal: Float!
    discount: Float!
    shipping: Float!
    tax: Float!
    total: Float!
    items: [OrderItem!]!
    trackingNumber: String
    carrier: String
    shippedAt: String
    deliveredAt: String
    customerNotes: String
    adminNotes: String
    createdAt: String!
  }

  type OrderItem {
    id: ID!
    productName: String!
    productImage: String
    quantity: Int!
    price: Float!
    total: Float!
  }

  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
    REFUNDED
  }

  extend type Query {
    order(id: ID, orderNumber: String): Order
    orders(page: Int, perPage: Int): [Order!]!
    ordersByStatus(status: OrderStatus!, page: Int, perPage: Int): [Order!]!
    userOrderHistory(page: Int, perPage: Int): [Order!]!
  }

  extend type Mutation {
    createOrder(
      items: [CreateOrderItemInput!]!
      shippingName: String!
      shippingPhone: String!
      shippingCountry: String!
      shippingCity: String!
      shippingStreet: String!
      shippingPostal: String
      couponCode: String
      customerNotes: String
    ): Order!
    
    cancelOrder(id: ID!): Order!
    updateOrderStatus(id: ID!, status: OrderStatus!): Order!
  }

  input CreateOrderItemInput {
    productId: ID!
    quantity: Int!
  }
`
