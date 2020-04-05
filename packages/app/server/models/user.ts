import { client } from '../graphql/client';
import { GET_USER } from '../graphql/queries';
import { CREATE_USER, UPDATE_LAST_LOGIN } from '../graphql/mutations';
import {
  UserQueryResult,
  UserQueryVariables,
  UserMutationResult,
  UserCreationVariables,
  UpdateLastLoginVariables,
  User,
} from './types';

async function find(authId: string): Promise<User> {
  const { data } = await client.query<UserQueryResult, UserQueryVariables>({
    query: GET_USER,
    variables: { authId },
  });

  return data ? data.user[0] : null;
}

async function create(userToCreate: User): Promise<User> {
  const { email, picture, auth_id: authId } = userToCreate;
  const { data } = await client.mutate<
    UserMutationResult,
    UserCreationVariables
  >({
    mutation: CREATE_USER,
    variables: { email, picture, authId },
  });

  const [user] = data.returning;
  return user;
}

async function updateLastLogin(authId: string): Promise<void> {
  await client.mutate<{}, UpdateLastLoginVariables>({
    mutation: UPDATE_LAST_LOGIN,
    variables: {
      authId,
      lastLogin: new Date().toISOString(),
    },
  });
}

export async function loginUser(userToTest: User): Promise<User> {
  const { auth_id: authId } = userToTest;
  let user = await find(authId);
  if (!user) {
    user = await create(userToTest);
  } else {
    await updateLastLogin(authId);
  }
  return user;
}
