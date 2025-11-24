const userResolver = {
  Query: {
    authUser: async (_: any, __: any, context: any) => {
      try {
        const user = await context.getUser?.()
        return user
      } catch (error: any) {
        console.log("Error in auth user", error)
        throw new Error(error.message)
      }
    },
    user: async (_: any, { userId }: { userId: string }) => {
      try {
        // Replace with your actual database call
        // const user = await userModel.findById(userId);
        return {
          id: userId,
          username: "testuser",
          name: "Test User",
          password: "hashed_password",
          gender: "male",
          profilePicture: "https://avatar.iran.liara.run/public/boy?username=testuser",
          createdAt: new Date().toISOString(),
        }
      } catch (error: any) {
        console.log("Error in user query", error)
        throw new Error(error.message)
      }
    },
  },
  Mutation: {
    signUp: async (_: any, { input }: any, context: any) => {
      try {
        const { username, name, password, gender } = input
        if (!username || !name || !password || !gender) throw new Error("All fields are required")

        // Replace with your actual database logic
        // const isUsernameExists = await userModel.findOne({ username });
        // if (isUsernameExists)
        //   throw new Error("This username exists, try another one");

        const newUser = {
          id: "1",
          username,
          name,
          password, // In production, hash this with bcrypt
          gender,
          profilePicture:
            gender === "male"
              ? `https://avatar.iran.liara.run/public/boy?username=${username}`
              : `https://avatar.iran.liara.run/public/girl?username=${username}`,
          createdAt: new Date().toISOString(),
        }

        // await context.login(newUser);
        return newUser
      } catch (error: any) {
        console.log("Error in signUp: ", error)
        throw new Error(error.message || "Internal server error")
      }
    },
    logIn: async (_: any, { input }: any, context: any) => {
      try {
        const { username, password } = input
        if (!username || !password) throw new Error("All fields are required")

        // Replace with your actual authentication logic
        // const { user } = await context.authenticate("graphql-local", {
        //   username,
        //   password,
        // });
        // await context.login(user);

        return {
          id: "1",
          username,
          name: "Test User",
          password,
          gender: "male",
          profilePicture: `https://avatar.iran.liara.run/public/boy?username=${username}`,
          createdAt: new Date().toISOString(),
        }
      } catch (error: any) {
        console.error("Error in login:", error)
        throw new Error(error.message || "Internal server error")
      }
    },
    logOut: async (_: any, __: any, context: any) => {
      try {
        // await context.logout();
        // req.session.destroy((err: any) => {
        //   if (err) throw err;
        // });
        // res.clearCookie("connect.sid");
        return { message: "Logged out successfully" }
      } catch (error: any) {
        console.error("Error in logout:", error)
        throw new Error(error.message || "Internal server error")
      }
    },
  },
}

export default userResolver
