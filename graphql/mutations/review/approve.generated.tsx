import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApproveReviewMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  approved: Types.Scalars['Boolean']['input'];
}>;


export type ApproveReviewMutation = { approveReview: { id: string, rating: number, title?: string | null, comment?: string | null, images: Array<string>, isVerifiedPurchase: boolean, isApproved: boolean, createdAt: string, user: { id: string, name?: string | null, email: string }, product: { id: string, name: string, slug: string } } };


export const ApproveReviewDocument = gql`
    mutation ApproveReview($id: ID!, $approved: Boolean!) {
  approveReview(id: $id, approved: $approved) {
    id
    user {
      id
      name
      email
    }
    product {
      id
      name
      slug
    }
    rating
    title
    comment
    images
    isVerifiedPurchase
    isApproved
    createdAt
  }
}
    `;
export type ApproveReviewMutationFn = Apollo.MutationFunction<ApproveReviewMutation, ApproveReviewMutationVariables>;

/**
 * __useApproveReviewMutation__
 *
 * To run a mutation, you first call `useApproveReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveReviewMutation, { data, loading, error }] = useApproveReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *      approved: // value for 'approved'
 *   },
 * });
 */
export function useApproveReviewMutation(baseOptions?: Apollo.MutationHookOptions<ApproveReviewMutation, ApproveReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveReviewMutation, ApproveReviewMutationVariables>(ApproveReviewDocument, options);
      }
export type ApproveReviewMutationHookResult = ReturnType<typeof useApproveReviewMutation>;
export type ApproveReviewMutationResult = Apollo.MutationResult<ApproveReviewMutation>;
export type ApproveReviewMutationOptions = Apollo.BaseMutationOptions<ApproveReviewMutation, ApproveReviewMutationVariables>;