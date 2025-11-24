import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListCategoriesDropdownQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListCategoriesDropdownQuery = { categoriesDropdown: Array<{ id: string, name: string }> };

export type ListBrandsDropdownQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListBrandsDropdownQuery = { brandsDropdown: Array<{ id: string, name: string }> };


export const ListCategoriesDropdownDocument = gql`
    query ListCategoriesDropdown {
  categoriesDropdown {
    id
    name
  }
}
    `;

/**
 * __useListCategoriesDropdownQuery__
 *
 * To run a query within a React component, call `useListCategoriesDropdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCategoriesDropdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCategoriesDropdownQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCategoriesDropdownQuery(baseOptions?: Apollo.QueryHookOptions<ListCategoriesDropdownQuery, ListCategoriesDropdownQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCategoriesDropdownQuery, ListCategoriesDropdownQueryVariables>(ListCategoriesDropdownDocument, options);
      }
export function useListCategoriesDropdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCategoriesDropdownQuery, ListCategoriesDropdownQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCategoriesDropdownQuery, ListCategoriesDropdownQueryVariables>(ListCategoriesDropdownDocument, options);
        }
export function useListCategoriesDropdownSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListCategoriesDropdownQuery, ListCategoriesDropdownQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListCategoriesDropdownQuery, ListCategoriesDropdownQueryVariables>(ListCategoriesDropdownDocument, options);
        }
export type ListCategoriesDropdownQueryHookResult = ReturnType<typeof useListCategoriesDropdownQuery>;
export type ListCategoriesDropdownLazyQueryHookResult = ReturnType<typeof useListCategoriesDropdownLazyQuery>;
export type ListCategoriesDropdownSuspenseQueryHookResult = ReturnType<typeof useListCategoriesDropdownSuspenseQuery>;
export type ListCategoriesDropdownQueryResult = Apollo.QueryResult<ListCategoriesDropdownQuery, ListCategoriesDropdownQueryVariables>;
export const ListBrandsDropdownDocument = gql`
    query ListBrandsDropdown {
  brandsDropdown {
    id
    name
  }
}
    `;

/**
 * __useListBrandsDropdownQuery__
 *
 * To run a query within a React component, call `useListBrandsDropdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBrandsDropdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBrandsDropdownQuery({
 *   variables: {
 *   },
 * });
 */
export function useListBrandsDropdownQuery(baseOptions?: Apollo.QueryHookOptions<ListBrandsDropdownQuery, ListBrandsDropdownQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBrandsDropdownQuery, ListBrandsDropdownQueryVariables>(ListBrandsDropdownDocument, options);
      }
export function useListBrandsDropdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBrandsDropdownQuery, ListBrandsDropdownQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBrandsDropdownQuery, ListBrandsDropdownQueryVariables>(ListBrandsDropdownDocument, options);
        }
export function useListBrandsDropdownSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListBrandsDropdownQuery, ListBrandsDropdownQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListBrandsDropdownQuery, ListBrandsDropdownQueryVariables>(ListBrandsDropdownDocument, options);
        }
export type ListBrandsDropdownQueryHookResult = ReturnType<typeof useListBrandsDropdownQuery>;
export type ListBrandsDropdownLazyQueryHookResult = ReturnType<typeof useListBrandsDropdownLazyQuery>;
export type ListBrandsDropdownSuspenseQueryHookResult = ReturnType<typeof useListBrandsDropdownSuspenseQuery>;
export type ListBrandsDropdownQueryResult = Apollo.QueryResult<ListBrandsDropdownQuery, ListBrandsDropdownQueryVariables>;