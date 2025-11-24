const transactionResolver = {
  Query: {
    transactions: async (_: any, { userId }: { userId: string }) => {
      try {
        // Replace with your actual database call
        // const transactions = await transactionModel.find({ userId });
        return [
          {
            id: "1",
            userId,
            amount: 100.5,
            description: "Test transaction",
            createdAt: new Date().toISOString(),
          },
        ]
      } catch (error: any) {
        console.log("Error fetching transactions", error)
        throw new Error(error.message)
      }
    },
    transaction: async (_: any, { id }: { id: string }) => {
      try {
        // Replace with your actual database call
        // const transaction = await transactionModel.findById(id);
        return {
          id,
          userId: "1",
          amount: 100.5,
          description: "Test transaction",
          createdAt: new Date().toISOString(),
        }
      } catch (error: any) {
        console.log("Error fetching transaction", error)
        throw new Error(error.message)
      }
    },
  },
  Mutation: {
    createTransaction: async (_: any, { input }: any, context: any) => {
      try {
        const { amount, description } = input
        const userId = context.userId || "1"

        // Replace with your actual database call
        // const newTransaction = await transactionModel.create({
        //   userId,
        //   amount,
        //   description,
        // });

        return {
          id: "new-transaction-id",
          userId,
          amount,
          description,
          createdAt: new Date().toISOString(),
        }
      } catch (error: any) {
        console.log("Error creating transaction", error)
        throw new Error(error.message || "Internal server error")
      }
    },
  },
}

export default transactionResolver
