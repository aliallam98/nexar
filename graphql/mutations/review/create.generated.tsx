import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateReviewMutationVariables = Types.Exact<{
  productId: Types.Scalars['ID']['input'];
  rating: Types.Scalars['Int']['input'];
  title?: Types.InputMaybe<Types.Scalars['String']['input']>;
  comment?: Types.InputMaybe<Types.Scalars['String']['input']>;
  images?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
}>;


export type CreateReviewMutation = { createReview: { id: string, rating: number, title?: string | null, comment?: string | null, images: Array<string>, isVerifiedPurchase: boolean, isApproved: boolean, createdAt: string, user: { id: string, name?: string | null, email: string }, product: { id: string, name: string, slug: string } } };


export const CreateReviewDocument = gql`
    mutation CreateReview($productId: ID!, $rating: Int!, $title: String, $comment: String, $images: [String!]) {
  createReview(
    productId: $productId
    rating: $rating
    title: $title
    comment: $comment
    images: $images
  ) {
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
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      rating: // value for 'rating'
 *      title: // value for 'title'
 *      comment: // value for 'comment'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;