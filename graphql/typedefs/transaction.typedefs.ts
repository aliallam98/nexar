const transactionTypeDefs = `
  type Transaction {
    id: ID!
    userId: ID!
    amount: Float!
    description: String!
    createdAt: String!
  }

  input CreateTransactionInput {
    amount: Float!
    description: String!
  }

  extend type Query {
    transactions(userId: ID!): [Transaction!]!
    transaction(id: ID!): Transaction
  }

  extend type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction
  }
`

export default transactionTypeDefs
