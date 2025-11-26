import gql from "graphql-tag";

export const contactRequestTypeDefs = gql`
  enum ContactStatus {
    NEW
    IN_PROGRESS
    RESOLVED
    ARCHIVED
  }

  type ContactRequest {
    id: ID!
    name: String!
    category: String!
    phone: String!
    message: String!
    status: ContactStatus!
    assignedTo: User
    assignedToId: String
    notes: String
    createdAt: String!
    updatedAt: String!
  }

  type ContactRequestConnection {
    items: [ContactRequest!]!
    total: Int!
    hasMore: Boolean!
  }

  input CreateContactRequestInput {
    name: String!
    category: String!
    phone: String!
    message: String!
  }

  input UpdateContactRequestStatusInput {
    id: ID!
    status: ContactStatus!
  }

  input AssignContactRequestInput {
    id: ID!
    assignedToId: String!
  }

  input AddContactRequestNotesInput {
    id: ID!
    notes: String!
  }

  input ContactRequestFilters {
    status: ContactStatus
    assignedToId: String
    search: String
  }

  type Query {
    contactRequest(id: ID!): ContactRequest
    contactRequests(
      filters: ContactRequestFilters
      skip: Int
      take: Int
    ): ContactRequestConnection!
    contactRequestStats: ContactRequestStats!
  }

  type ContactRequestStats {
    total: Int!
    new: Int!
    inProgress: Int!
    resolved: Int!
    archived: Int!
  }

  type Mutation {
    createContactRequest(input: CreateContactRequestInput!): ContactRequest!
    updateContactRequestStatus(input: UpdateContactRequestStatusInput!): ContactRequest!
    assignContactRequest(input: AssignContactRequestInput!): ContactRequest!
    addContactRequestNotes(input: AddContactRequestNotesInput!): ContactRequest!
    deleteContactRequest(id: ID!): Boolean!
  }
`;
