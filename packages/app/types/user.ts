export interface UserBase {
  id: string;
  username: string;
  password: string;
  created_at: Date;
}

export type User = UserBase
