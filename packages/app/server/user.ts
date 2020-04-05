import query from './query';

export interface User {
  auth_id: string;
  email: string;
  picture: string;
}

async function getUser(authId: string): Promise<User> {
  const data = await query<{ authId: string }, { user: User[] }>({
    query: `
    query user($authId: String!) {
        user(limit: 1, where: {auth_id: {_eq: $authId}, active: {_eq: true}}) {
          id
        }
      }      
    `,
    variables: [{ authId }],
    operationName: 'user',
  });
  return data ? data.user[0] : null;
}

async function createUser(userToCreate: User): Promise<User> {
  const { email, picture, auth_id: authId } = userToCreate;
  const data = await query<{}, { user: User[] }>({
    query: `
    mutation create_user($email: String!, $picture: String!, $authId: String!) {
        insert_user(objects: {email: $email, picture: $picture, active: true, auth_id: $authId}) {
          affected_rows
        }
    }`,
    variables: [{ email, picture, authId }],
    operationName: 'create_user',
  });
  const user = data ? data.user[0] : null;
  return user;
}

async function updateLastLogin(): Promise<User> {
  // TODO
  return null;
}

export async function loginUser(userToTest: User): Promise<User> {
  const { auth_id: authId } = userToTest;
  let user = await getUser(authId);
  if (!user) {
    user = await createUser(user);
  } else {
    user = await updateLastLogin();
  }
  return user;
}
