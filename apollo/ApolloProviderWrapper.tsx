"use client";

import React, { useMemo } from "react";
import {
  ApolloProvider,
  ApolloLink,
  ApolloClient,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useAuth } from "../context/AuthContext";
import { apolloClient as baseClient } from "./client";
// import { UAParser } from "ua-parser-js";
import { version } from "../package.json";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// Parse browser and OS info
// const parser = new UAParser();
// const browserName = parser.getBrowser().name || "UnknownBrowser";
// const osName = parser.getOS().name || "UnknownOS";

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const {} = useAuth();
  const { t, i18n } = useTranslation(["common"]);

  const authLink = useMemo(() => {
    return new ApolloLink((operation, forward) => {
      return new Observable((observer) => {
        (async () => {
          try {
            // if (!token || isTokenExpired(token)) {
            //   setToken(await refreshTokenMutation());
            // }

            const headers: Record<string, string> = {
              // "X-Client-Name": `${osName}-${browserName}`,
              "x-lang": i18n.language ?? "en",
              "X-App-Version": version,
            };

            operation.setContext(({ headers: existing = {} }) => ({
              headers: { ...existing, ...headers },
            }));

            const subscriber = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });

            return () => {
              if (subscriber) subscriber.unsubscribe();
            };
          } catch (err) {
            console.error("authLink failed", err);
            observer.error(err);
          }
        })();
      });
    });
  }, [i18n.language]);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (
      graphQLErrors?.[0]?.extensions?.code === "FORBIDDEN" &&
      graphQLErrors?.[0]?.extensions?.category === "PERMISSIONS"
    ) {
      toast.error(t("forbidden"));
    }
    console.error(graphQLErrors, networkError);
  });

  const client = useMemo(
    () =>
      new ApolloClient({
        cache: baseClient.cache,
        link: ApolloLink.from([authLink, errorLink, baseClient.link]),
      }),
    [authLink]
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
