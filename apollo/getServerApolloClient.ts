import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { headers } from "next/headers";

/*
`
export default async function DashboardPage() {
  const client = await getServerApolloClient(); // ✅ also await here
  const { data } = await client.query({
    query: GET_USER,
    fetchPolicy: "no-cache",
  });

  return <h1>Hello, {data.meEmployee.firstName}</h1>;
}
`
*/

export async function getServerApolloClient() {
  const requestHeaders = await headers();

  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      credentials: "include",
      headers: {
        cookie: requestHeaders.get("cookie") || "",
        authorization: requestHeaders.get("authorization") || "",
      },
    }),
    cache: new InMemoryCache(),
  });
}
