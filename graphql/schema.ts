import { makeExecutableSchema } from "@graphql-tools/schema"
import { mergedTypeDefs } from "./typedefs"
import { mergedResolvers } from "./resolvers"

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
})

export default schema
