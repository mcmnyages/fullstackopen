// src/graphql/queries.js
import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $first:Int
    $after:String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      first:$first
      after:$after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryFields
        }
      }
      pageInfo {
      startCursor
      hasPreviousPage
      endCursor
      hasNextPage
    }
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repository {
            id
            fullName
          }
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryFields
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;