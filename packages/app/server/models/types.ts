export interface UserQueryResult {
  user: User[];
}

export interface UserQueryVariables {
  authId: string;
}

export interface UserCreationVariables {
  email: string;
  picture: string;
  authId: string;
}

export interface UpdateLastLoginVariables {
  authId: string;
  lastLogin: string;
}

export interface InsertUserMutationResult {
  insert_user: {
    affected_rows: number;
    returning: User[];
  };
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
