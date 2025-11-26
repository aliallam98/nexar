import { gql } from "@apollo/client";

export const CREATE_CONTACT_REQUEST = gql`
  mutation CreateContactRequest($input: CreateContactRequestInput!) {
    createContactRequest(input: $input) {
      id
      name
      category
      phone
      message
      status
      createdAt
    }
  }
`;

export const GET_CONTACT_REQUESTS = gql`
  query GetContactRequests($filters: ContactRequestFilters, $skip: Int, $take: Int) {
    contactRequests(filters: $filters, skip: $skip, take: $take) {
      items {
        id
        name
        category
        phone
        message
        status
        assignedTo {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      total
      hasMore
    }
  }
`;

export const GET_CONTACT_REQUEST = gql`
  query GetContactRequest($id: ID!) {
    contactRequest(id: $id) {
      id
      name
      category
      phone
      message
      status
      assignedTo {
        id
        name
        email
      }
      assignedToId
      notes
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CONTACT_REQUEST_STATUS = gql`
  mutation UpdateContactRequestStatus($input: UpdateContactRequestStatusInput!) {
    updateContactRequestStatus(input: $input) {
      id
      status
      updatedAt
    }
  }
`;

export const ASSIGN_CONTACT_REQUEST = gql`
  mutation AssignContactRequest($input: AssignContactRequestInput!) {
    assignContactRequest(input: $input) {
      id
      assignedTo {
        id
        name
        email
      }
      updatedAt
    }
  }
`;

export const ADD_CONTACT_REQUEST_NOTES = gql`
  mutation AddContactRequestNotes($input: AddContactRequestNotesInput!) {
    addContactRequestNotes(input: $input) {
      id
      notes
      updatedAt
    }
  }
`;

export const GET_CONTACT_REQUEST_STATS = gql`
  query GetContactRequestStats {
    contactRequestStats {
      total
      new
      inProgress
      resolved
      archived
    }
  }
`;
