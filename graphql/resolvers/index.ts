import { mergeResolvers } from "@graphql-tools/merge";
import { authResolver } from "./auth.resolver";
import { productResolver } from "./product.resolver";
import { cartResolver } from "./cart.resolver";
import { orderResolver } from "./order.resolver";
import { wishlistResolver } from "./wishlist.resolver";
import { couponResolver } from "./coupon.resolver";
import { addressResolver } from "./address.resolver";
import { reviewResolver } from "./review.resolver";
import { expenseResolver } from "./expense.resolver";

export const mergedResolvers = mergeResolvers([
  authResolver,
  productResolver,
  expenseResolver,
  // cartResolver,
  // orderResolver,
  // wishlistResolver,
  // couponResolver,
  // addressResolver,
  // reviewResolver,
  {
    Query: {
      health: () => "GraphQL server is running",
    },
  },
]);
