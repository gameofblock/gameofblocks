export interface UserBase {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  active: boolean;
  email: string;
}

export type User = UserBase
