import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import schema from "../../../graphql/schema";
import { verifyToken } from "../../../lib/jwt";

const server = new ApolloServer({
  schema,
  introspection: true,
  includeStacktraceInErrorResponses: process.env.NODE_ENV === "development",
  formatError: (error) => {
    console.error("[GraphQL Error]", error);
    return error;
  },
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    try {
      const cookies = req.headers.get("cookie") || "";
      const authToken = cookies
        .split("; ")
        .find((c) => c.startsWith("authToken="))
        ?.split("=")[1];

      let userId: string | undefined;
      let role: string | undefined;

      if (authToken) {
        const decoded = verifyToken(authToken);
        if (decoded) {
          userId = decoded.userId;
          role = decoded.role;
        }
      }

      return {
        userId,
        role,
        userRole: role, // Add userRole for expense resolver
        res,
      };
    } catch (error) {
      console.error("[Context Error]", error);
      return {
        res,
      };
    }
  },
});

export async function POST(request: Request) {
  try {
    return await handler(request);
  } catch (error) {
    console.error("[v0] POST Error:", error);
    console.error(
      "[v0] Error details:",
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      "[v0] Stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return new Response(
      JSON.stringify({
        errors: [
          {
            message:
              "Internal server error: " +
              (error instanceof Error ? error.message : String(error)),
            extensions: { code: "INTERNAL_SERVER_ERROR" },
          },
        ],
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(request: Request) {
  try {
    return await handler(request);
  } catch (error) {
    console.error("[v0] GET Error:", error);
    return new Response(
      JSON.stringify({
        errors: [
          {
            message: "Internal server error",
            extensions: { code: "INTERNAL_SERVER_ERROR" },
          },
        ],
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
