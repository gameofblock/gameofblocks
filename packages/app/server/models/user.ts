import { client } from '../graphql/client';
import { GET_USER } from '../graphql/queries';
import { CREATE_USER, UPDATE_LAST_LOGIN } from '../graphql/mutations';
import {
  UserQueryResult,
  UserQueryVariables,
  InsertUserMutationResult,
  UserCreationVariables,
  UpdateLastLoginVariables,
  User,
} from './types';
import { logger } from '../../utils/logger';

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
    InsertUserMutationResult,
    UserCreationVariables
  >({
    mutation: CREATE_USER,
    variables: { email, picture, authId },
  });

  const {
    insert_user: { returning },
  } = data;
  const [user] = returning;
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
    logger.info(`🚫 User ${authId} does not exist. User creation attempt...`);
    user = await create(userToTest);
  } else {
    logger.info(`👋 User ${authId} logged in successfully`);
    await updateLastLogin(authId);
  }
  return user;
}
