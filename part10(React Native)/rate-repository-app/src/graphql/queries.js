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