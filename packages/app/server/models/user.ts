import { client } from '../graphql/client';
import { GET_USER } from '../graphql/queries';
import { CREATE_USER } from '../graphql/mutations';
import { UserQueryResult, UserQueryVariables, User } from './types';

async function find(authId: string): Promise<User> {
  const { data } = await client.query<UserQueryResult, UserQueryVariables>({
    query: GET_USER,
    variables: { authId },
  });

  return data ? data.user[0] : null;
}

async function create(userToCreate: User): Promise<User> {
  const { email, picture, auth_id: authId } = userToCreate;
  const { data } = await client.mutate({
    mutation: CREATE_USER,
    variables: { email, picture, authId },
  });

  const user = data ? data.user[0] : null;
  return user;
}

export async function loginUser(userToTest: User): Promise<User> {
  const { auth_id: authId } = userToTest;
  let user = await find(authId);
  if (!user) {
    user = await create(user);
  }
  return user;
}
