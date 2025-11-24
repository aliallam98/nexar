import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BrandsDropdownQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BrandsDropdownQuery = { brandsDropdown: Array<{ id: string, name: string, slug: string, image?: string | null, description?: string | null, isActive: boolean, createdAt: string, updatedAt: string }> };


export const BrandsDropdownDocument = gql`
    query BrandsDropdown {
  brandsDropdown {
    id
    name
    slug
    image
    description
    isActive
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useBrandsDropdownQuery__
 *
 * To run a query within a React component, call `useBrandsDropdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandsDropdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandsDropdownQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrandsDropdownQuery(baseOptions?: Apollo.QueryHookOptions<BrandsDropdownQuery, BrandsDropdownQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrandsDropdownQuery, BrandsDropdownQueryVariables>(BrandsDropdownDocument, options);
      }
export function useBrandsDropdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandsDropdownQuery, BrandsDropdownQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrandsDropdownQuery, BrandsDropdownQueryVariables>(BrandsDropdownDocument, options);
        }
export function useBrandsDropdownSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BrandsDropdownQuery, BrandsDropdownQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BrandsDropdownQuery, BrandsDropdownQueryVariables>(BrandsDropdownDocument, options);
        }
export type BrandsDropdownQueryHookResult = ReturnType<typeof useBrandsDropdownQuery>;
export type BrandsDropdownLazyQueryHookResult = ReturnType<typeof useBrandsDropdownLazyQuery>;
export type BrandsDropdownSuspenseQueryHookResult = ReturnType<typeof useBrandsDropdownSuspenseQuery>;
export type BrandsDropdownQueryResult = Apollo.QueryResult<BrandsDropdownQuery, BrandsDropdownQueryVariables>;