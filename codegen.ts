import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql", // your GraphQL endpoint
  documents: [
    "graphql/queries/**/*.graphql",
    "graphql/mutations/**/*.graphql",
    "graphql/fragments/**/*.graphql",
  ],
  generates: {
    "graphql/types.ts": {
      plugins: ["typescript"],
    },
    graphql: {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "types.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        enumsAsTypes: true,
        skipTypename: true,
        withHooks: true, // enables useQuery/useMutation hooks
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
