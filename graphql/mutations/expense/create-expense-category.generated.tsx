import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateExpenseCategoryMutationVariables = Types.Exact<{
  input: Types.CreateExpenseCategoryInput;
}>;


export type CreateExpenseCategoryMutation = { createExpenseCategory: { id: string, name: string, description?: string | null, isActive: boolean, createdAt: string } };


export const CreateExpenseCategoryDocument = gql`
    mutation CreateExpenseCategory($input: CreateExpenseCategoryInput!) {
  createExpenseCategory(input: $input) {
    id
    name
    description
    isActive
    createdAt
  }
}
    `;
export type CreateExpenseCategoryMutationFn = Apollo.MutationFunction<CreateExpenseCategoryMutation, CreateExpenseCategoryMutationVariables>;

/**
 * __useCreateExpenseCategoryMutation__
 *
 * To run a mutation, you first call `useCreateExpenseCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpenseCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpenseCategoryMutation, { data, loading, error }] = useCreateExpenseCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExpenseCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateExpenseCategoryMutation, CreateExpenseCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExpenseCategoryMutation, CreateExpenseCategoryMutationVariables>(CreateExpenseCategoryDocument, options);
      }
export type CreateExpenseCategoryMutationHookResult = ReturnType<typeof useCreateExpenseCategoryMutation>;
export type CreateExpenseCategoryMutationResult = Apollo.MutationResult<CreateExpenseCategoryMutation>;
export type CreateExpenseCategoryMutationOptions = Apollo.BaseMutationOptions<CreateExpenseCategoryMutation, CreateExpenseCategoryMutationVariables>;