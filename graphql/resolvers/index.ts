import { mergeResolvers } from "@graphql-tools/merge";
import { authResolver } from "./auth.resolver";
import { expenseResolver } from "./expense.resolver";
import { contactRequestResolvers } from "./contactRequest.resolver";

export const mergedResolvers = mergeResolvers([
  authResolver,
  expenseResolver,
  contactRequestResolvers,
  {
    Query: {
      health: () => "GraphQL server is running",
    },
  },
]);
