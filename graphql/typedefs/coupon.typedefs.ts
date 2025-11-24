import { gql } from "graphql-tag"

export const couponTypeDefs = gql`
  type Coupon {
    id: ID!
    code: String!
    description: String
    discountType: DiscountType!
    discountValue: Float!
    minPurchase: Float
    maxDiscount: Float
    isActive: Boolean!
    expiresAt: String
  }

  enum DiscountType {
    PERCENTAGE
    FIXED
  }

  type ValidateCouponPayload {
    valid: Boolean!
    coupon: Coupon
    discount: Float
    error: String
  }

  extend type Query {
    coupon(code: String!): Coupon
    validateCoupon(code: String!, orderTotal: Float!): ValidateCouponPayload!
    coupons(page: Int, perPage: Int): [Coupon!]!
  }

  extend type Mutation {
    createCoupon(
      code: String!
      description: String
      discountType: DiscountType!
      discountValue: Float!
      minPurchase: Float
      maxDiscount: Float
      maxUseCount: Int
      maxUsePerUser: Int
      startsAt: String
      expiresAt: String
    ): Coupon!
    
    updateCoupon(id: ID!, code: String, discountValue: Float, expiresAt: String): Coupon!
    deleteCoupon(id: ID!): Boolean!
    toggleCouponStatus(id: ID!): Coupon!
    applyCoupon(couponCode: String!): ValidateCouponPayload!
  }
`
