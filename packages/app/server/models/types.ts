export interface UserQueryResult {
  user: User[];
}

export interface UserQueryVariables {
  authId: string;
}

export interface UserMutationResult {
  affected_rows: number;
}

export interface User {
  auth_id: string;
  email: string;
  picture: string;
}
