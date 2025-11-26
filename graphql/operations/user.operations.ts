import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($pagination: PaginationInput) {
    users(pagination: $pagination) {
      items {
        id
        name
        email
        role
        image
      }
      pagination {
        totalItems
      }
    }
  }
`;
