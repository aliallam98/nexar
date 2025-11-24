import { ApolloServer } from "@apollo/server"
import schema from "./schema"

export interface GraphQLContext {
  userId?: string
  role?: string
  res?: any
}

const apolloServer = new ApolloServer<GraphQLContext>({
  schema,
  introspection: true,
  includeStacktraceInErrorResponses: process.env.NODE_ENV === "development",
})

export default apolloServer
