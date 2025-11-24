import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CartItemCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CartItemCountQuery = { cartItemCount: number };


export const CartItemCountDocument = gql`
    query CartItemCount {
  cartItemCount
}
    `;

/**
 * __useCartItemCountQuery__
 *
 * To run a query within a React component, call `useCartItemCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartItemCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartItemCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartItemCountQuery(baseOptions?: Apollo.QueryHookOptions<CartItemCountQuery, CartItemCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartItemCountQuery, CartItemCountQueryVariables>(CartItemCountDocument, options);
      }
export function useCartItemCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartItemCountQuery, CartItemCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartItemCountQuery, CartItemCountQueryVariables>(CartItemCountDocument, options);
        }
export function useCartItemCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CartItemCountQuery, CartItemCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CartItemCountQuery, CartItemCountQueryVariables>(CartItemCountDocument, options);
        }
export type CartItemCountQueryHookResult = ReturnType<typeof useCartItemCountQuery>;
export type CartItemCountLazyQueryHookResult = ReturnType<typeof useCartItemCountLazyQuery>;
export type CartItemCountSuspenseQueryHookResult = ReturnType<typeof useCartItemCountSuspenseQuery>;
export type CartItemCountQueryResult = Apollo.QueryResult<CartItemCountQuery, CartItemCountQueryVariables>;