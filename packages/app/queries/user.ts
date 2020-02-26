import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query GetCurrentUser ($userId: uuid!) {
    user(where: { id: { _eq: $userId } }) {
      id
      email
      username
    }
  }
`;
