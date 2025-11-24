import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApproveExpenseEditMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ApproveExpenseEditMutation = { approveExpenseEdit: { id: string, title: string, description?: string | null, amount: number, receiptUrl?: string | null, expenseDate: string, status: Types.ExpenseStatus, updatedAt: string, category: { id: string, name: string } } };


export const ApproveExpenseEditDocument = gql`
    mutation ApproveExpenseEdit($id: ID!) {
  approveExpenseEdit(id: $id) {
    id
    title
    description
    amount
    receiptUrl
    expenseDate
    status
    category {
      id
      name
    }
    updatedAt
  }
}
    `;
export type ApproveExpenseEditMutationFn = Apollo.MutationFunction<ApproveExpenseEditMutation, ApproveExpenseEditMutationVariables>;

/**
 * __useApproveExpenseEditMutation__
 *
 * To run a mutation, you first call `useApproveExpenseEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveExpenseEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveExpenseEditMutation, { data, loading, error }] = useApproveExpenseEditMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveExpenseEditMutation(baseOptions?: Apollo.MutationHookOptions<ApproveExpenseEditMutation, ApproveExpenseEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveExpenseEditMutation, ApproveExpenseEditMutationVariables>(ApproveExpenseEditDocument, options);
      }
export type ApproveExpenseEditMutationHookResult = ReturnType<typeof useApproveExpenseEditMutation>;
export type ApproveExpenseEditMutationResult = Apollo.MutationResult<ApproveExpenseEditMutation>;
export type ApproveExpenseEditMutationOptions = Apollo.BaseMutationOptions<ApproveExpenseEditMutation, ApproveExpenseEditMutationVariables>;