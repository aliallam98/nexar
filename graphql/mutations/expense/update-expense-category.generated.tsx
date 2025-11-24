import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateExpenseCategoryMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  input: Types.UpdateExpenseCategoryInput;
}>;


export type UpdateExpenseCategoryMutation = { updateExpenseCategory: { id: string, name: string, description?: string | null, isActive: boolean, updatedAt: string } };


export const UpdateExpenseCategoryDocument = gql`
    mutation UpdateExpenseCategory($id: ID!, $input: UpdateExpenseCategoryInput!) {
  updateExpenseCategory(id: $id, input: $input) {
    id
    name
    description
    isActive
    updatedAt
  }
}
    `;
export type UpdateExpenseCategoryMutationFn = Apollo.MutationFunction<UpdateExpenseCategoryMutation, UpdateExpenseCategoryMutationVariables>;

/**
 * __useUpdateExpenseCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateExpenseCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExpenseCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExpenseCategoryMutation, { data, loading, error }] = useUpdateExpenseCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExpenseCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExpenseCategoryMutation, UpdateExpenseCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExpenseCategoryMutation, UpdateExpenseCategoryMutationVariables>(UpdateExpenseCategoryDocument, options);
      }
export type UpdateExpenseCategoryMutationHookResult = ReturnType<typeof useUpdateExpenseCategoryMutation>;
export type UpdateExpenseCategoryMutationResult = Apollo.MutationResult<UpdateExpenseCategoryMutation>;
export type UpdateExpenseCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateExpenseCategoryMutation, UpdateExpenseCategoryMutationVariables>;