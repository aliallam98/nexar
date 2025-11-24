import { gql } from "graphql-tag"

export const reviewTypeDefs = gql`
  type Review {
    id: ID!
    user: User!
    product: Product!
    rating: Int!
    title: String
    comment: String
    images: [String!]!
    isVerifiedPurchase: Boolean!
    isApproved: Boolean!
    createdAt: String!
  }

  extend type Query {
    review(id: ID!): Review
    productReviews(productId: ID!, page: Int, perPage: Int): [Review!]!
    reviews(page: Int, perPage: Int): [Review!]!
  }

  extend type Mutation {
    createReview(productId: ID!, rating: Int!, title: String, comment: String, images: [String!]): Review!
    updateReview(id: ID!, rating: Int, comment: String, images: [String!]): Review!
    deleteReview(id: ID!): Boolean!
    approveReview(id: ID!, approved: Boolean!): Review!
  }
`
