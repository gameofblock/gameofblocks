import gql from 'graphql-tag';

export interface UserQueryProps {
  user: {
    picture: string;
    email: string;
    last_login: string;
  }[];
}

export const USER = gql`
  query user {
    user {
      picture
      email
      last_login
    }
  }
`;
