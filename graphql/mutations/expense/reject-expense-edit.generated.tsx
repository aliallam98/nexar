import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectExpenseEditMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  rejectionReason?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RejectExpenseEditMutation = { rejectExpenseEdit: { id: string, title: string, status: Types.ExpenseStatus, updatedAt: string } };


export const RejectExpenseEditDocument = gql`
    mutation RejectExpenseEdit($id: ID!, $rejectionReason: String) {
  rejectExpenseEdit(id: $id, rejectionReason: $rejectionReason) {
    id
    title
    status
    updatedAt
  }
}
    `;
export type RejectExpenseEditMutationFn = Apollo.MutationFunction<RejectExpenseEditMutation, RejectExpenseEditMutationVariables>;

/**
 * __useRejectExpenseEditMutation__
 *
 * To run a mutation, you first call `useRejectExpenseEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectExpenseEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectExpenseEditMutation, { data, loading, error }] = useRejectExpenseEditMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rejectionReason: // value for 'rejectionReason'
 *   },
 * });
 */
export function useRejectExpenseEditMutation(baseOptions?: Apollo.MutationHookOptions<RejectExpenseEditMutation, RejectExpenseEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectExpenseEditMutation, RejectExpenseEditMutationVariables>(RejectExpenseEditDocument, options);
      }
export type RejectExpenseEditMutationHookResult = ReturnType<typeof useRejectExpenseEditMutation>;
export type RejectExpenseEditMutationResult = Apollo.MutationResult<RejectExpenseEditMutation>;
export type RejectExpenseEditMutationOptions = Apollo.BaseMutationOptions<RejectExpenseEditMutation, RejectExpenseEditMutationVariables>;