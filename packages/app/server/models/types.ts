export interface UserQueryResult {
  user: User[];
}

export interface UserQueryVariables {
  authId: string;
}

export interface CreateUserVariables {
  email: string;
  picture: string;
  authId: string;
}

export interface CreateUserMutationResult {
  insert_user: {
    affected_rows: number;
    returning: User[];
  };
}

export interface UpdateLastLoginVariables {
  authId: string;
  lastLogin: string;
}

export interface Auth0User {
  auth_id: string;
  email: string;
  picture: string;
}

export interface User {
  id: string;
  auth_id: string;
  email: string;
  picture: string;
}
