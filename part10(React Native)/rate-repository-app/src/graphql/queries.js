import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
query{
  repositories {
    edges {
      node {
        id
        fullName
        description
        language
        stargazersCount
        forksCount
        ownerAvatarUrl
        ownerName
        reviewCount
        ratingAverage
      }
    }
  }
}
`

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    me {
      id
      username
    }
  }
`;


export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      ownerAvatarUrl
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
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
`;


