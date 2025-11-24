import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAddressMutationVariables = Types.Exact<{
  label?: Types.InputMaybe<Types.Scalars['String']['input']>;
  fullName: Types.Scalars['String']['input'];
  phone: Types.Scalars['String']['input'];
  country: Types.Scalars['String']['input'];
  city: Types.Scalars['String']['input'];
  street: Types.Scalars['String']['input'];
  postalCode?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CreateAddressMutation = { createAddress: { id: string, label?: string | null, fullName: string, phone: string, country: string, city: string, street: string, postalCode?: string | null, isDefault: boolean, createdAt: string } };


export const CreateAddressDocument = gql`
    mutation CreateAddress($label: String, $fullName: String!, $phone: String!, $country: String!, $city: String!, $street: String!, $postalCode: String) {
  createAddress(
    label: $label
    fullName: $fullName
    phone: $phone
    country: $country
    city: $city
    street: $street
    postalCode: $postalCode
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
export type CreateAddressMutationFn = Apollo.MutationFunction<CreateAddressMutation, CreateAddressMutationVariables>;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      label: // value for 'label'
 *      fullName: // value for 'fullName'
 *      phone: // value for 'phone'
 *      country: // value for 'country'
 *      city: // value for 'city'
 *      street: // value for 'street'
 *      postalCode: // value for 'postalCode'
 *   },
 * });
 */
export function useCreateAddressMutation(baseOptions?: Apollo.MutationHookOptions<CreateAddressMutation, CreateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, options);
      }
export type CreateAddressMutationHookResult = ReturnType<typeof useCreateAddressMutation>;
export type CreateAddressMutationResult = Apollo.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = Apollo.BaseMutationOptions<CreateAddressMutation, CreateAddressMutationVariables>;