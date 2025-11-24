import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateReviewMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  rating?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  comment?: Types.InputMaybe<Types.Scalars['String']['input']>;
  images?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
}>;


export type UpdateReviewMutation = { updateReview: { id: string, rating: number, title?: string | null, comment?: string | null, images: Array<string>, isVerifiedPurchase: boolean, isApproved: boolean, createdAt: string, user: { id: string, name?: string | null, email: string }, product: { id: string, name: string, slug: string } } };


export const UpdateReviewDocument = gql`
    mutation UpdateReview($id: ID!, $rating: Int, $comment: String, $images: [String!]) {
  updateReview(id: $id, rating: $rating, comment: $comment, images: $images) {
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
export type UpdateReviewMutationFn = Apollo.MutationFunction<UpdateReviewMutation, UpdateReviewMutationVariables>;

/**
 * __useUpdateReviewMutation__
 *
 * To run a mutation, you first call `useUpdateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReviewMutation, { data, loading, error }] = useUpdateReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rating: // value for 'rating'
 *      comment: // value for 'comment'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useUpdateReviewMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReviewMutation, UpdateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReviewMutation, UpdateReviewMutationVariables>(UpdateReviewDocument, options);
      }
export type UpdateReviewMutationHookResult = ReturnType<typeof useUpdateReviewMutation>;
export type UpdateReviewMutationResult = Apollo.MutationResult<UpdateReviewMutation>;
export type UpdateReviewMutationOptions = Apollo.BaseMutationOptions<UpdateReviewMutation, UpdateReviewMutationVariables>;