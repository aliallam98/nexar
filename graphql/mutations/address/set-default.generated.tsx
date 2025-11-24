import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetDefaultAddressMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type SetDefaultAddressMutation = { setDefaultAddress: { id: string, label?: string | null, fullName: string, phone: string, country: string, city: string, street: string, postalCode?: string | null, isDefault: boolean, createdAt: string } };


export const SetDefaultAddressDocument = gql`
    mutation SetDefaultAddress($id: ID!) {
  setDefaultAddress(id: $id) {
    id
    label
    fullName
    phone
    country
    city
    street
    postalCode
    isDefault
    createdAt
  }
}
    `;
export type SetDefaultAddressMutationFn = Apollo.MutationFunction<SetDefaultAddressMutation, SetDefaultAddressMutationVariables>;

/**
 * __useSetDefaultAddressMutation__
 *
 * To run a mutation, you first call `useSetDefaultAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultAddressMutation, { data, loading, error }] = useSetDefaultAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetDefaultAddressMutation(baseOptions?: Apollo.MutationHookOptions<SetDefaultAddressMutation, SetDefaultAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDefaultAddressMutation, SetDefaultAddressMutationVariables>(SetDefaultAddressDocument, options);
      }
export type SetDefaultAddressMutationHookResult = ReturnType<typeof useSetDefaultAddressMutation>;
export type SetDefaultAddressMutationResult = Apollo.MutationResult<SetDefaultAddressMutation>;
export type SetDefaultAddressMutationOptions = Apollo.BaseMutationOptions<SetDefaultAddressMutation, SetDefaultAddressMutationVariables>;