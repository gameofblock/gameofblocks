import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation create_user($email: String!, $picture: String!, $authId: String!) {
    insert_user(
      objects: {
        email: $email
        picture: $picture
        active: true
        auth_id: $authId
      }
    ) {
      affected_rows
      returning {
        id
        active
        auth_id
        email
        last_login
        picture
        username
      }
    }
  }
`;

export const UPDATE_LAST_LOGIN = gql`
  mutation update_user_last_login($authId: String!, $lastLogin: timestamptz!) {
    update_user(
      where: { auth_id: { _eq: $authId } }
      _set: { last_login: $lastLogin }
    ) {
      affected_rows
      returning {
        id
        last_login
      }
    }
  }
`;
