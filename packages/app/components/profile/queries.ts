import gql from 'graphql-tag';

export const USER = gql`
  query user {
    user {
      picture
      email
      last_login
    }
  }
`;
