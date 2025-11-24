import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddressesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AddressesQuery = { addresses: Array<{ id: string, label?: string | null, fullName: string, phone: string, country: string, city: string, street: string, postalCode?: string | null, isDefault: boolean, createdAt: string }> };


export const AddressesDocument = gql`
    query Addresses {
  addresses {
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

/**
 * __useAddressesQuery__
 *
 * To run a query within a React component, call `useAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAddressesQuery(baseOptions?: Apollo.QueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, options);
      }
export function useAddressesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, options);
        }
export function useAddressesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, options);
        }
export type AddressesQueryHookResult = ReturnType<typeof useAddressesQuery>;
export type AddressesLazyQueryHookResult = ReturnType<typeof useAddressesLazyQuery>;
export type AddressesSuspenseQueryHookResult = ReturnType<typeof useAddressesSuspenseQuery>;
export type AddressesQueryResult = Apollo.QueryResult<AddressesQuery, AddressesQueryVariables>;