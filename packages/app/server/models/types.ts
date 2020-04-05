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

export interface UserMutationResult {
  affected_rows: number;
  returning: User[];
}

export interface User {
  auth_id: string;
  email: string;
  picture: string;
}
