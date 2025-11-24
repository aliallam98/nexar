import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteExpenseCategoryMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeleteExpenseCategoryMutation = { deleteExpenseCategory: boolean };


export const DeleteExpenseCategoryDocument = gql`
    mutation DeleteExpenseCategory($id: ID!) {
  deleteExpenseCategory(id: $id)
}
    `;
export type DeleteExpenseCategoryMutationFn = Apollo.MutationFunction<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>;

/**
 * __useDeleteExpenseCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteExpenseCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExpenseCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExpenseCategoryMutation, { data, loading, error }] = useDeleteExpenseCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExpenseCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>(DeleteExpenseCategoryDocument, options);
      }
export type DeleteExpenseCategoryMutationHookResult = ReturnType<typeof useDeleteExpenseCategoryMutation>;
export type DeleteExpenseCategoryMutationResult = Apollo.MutationResult<DeleteExpenseCategoryMutation>;
export type DeleteExpenseCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>;