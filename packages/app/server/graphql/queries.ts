import gql from 'graphql-tag';

export const GET_USER = gql`
  query user($authId: String!) {
    user(
      limit: 1
      where: { auth_id: { _eq: $authId }, active: { _eq: true } }
    ) {
      auth_id
      email
      picture
    }
  }
`;
