import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAddressMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  label?: Types.InputMaybe<Types.Scalars['String']['input']>;
  fullName?: Types.InputMaybe<Types.Scalars['String']['input']>;
  phone?: Types.InputMaybe<Types.Scalars['String']['input']>;
  country?: Types.InputMaybe<Types.Scalars['String']['input']>;
  city?: Types.InputMaybe<Types.Scalars['String']['input']>;
  street?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateAddressMutation = { updateAddress: { id: string, label?: string | null, fullName: string, phone: string, country: string, city: string, street: string, postalCode?: string | null, isDefault: boolean, createdAt: string } };


export const UpdateAddressDocument = gql`
    mutation UpdateAddress($id: ID!, $label: String, $fullName: String, $phone: String, $country: String, $city: String, $street: String) {
  updateAddress(
    id: $id
    label: $label
    fullName: $fullName
    phone: $phone
    country: $country
    city: $city
    street: $street
  ) {
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
export type UpdateAddressMutationFn = Apollo.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *      label: // value for 'label'
 *      fullName: // value for 'fullName'
 *      phone: // value for 'phone'
 *      country: // value for 'country'
 *      city: // value for 'city'
 *      street: // value for 'street'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, options);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = Apollo.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<UpdateAddressMutation, UpdateAddressMutationVariables>;