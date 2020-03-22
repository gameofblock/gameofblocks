export interface UserBase {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  active: boolean;
}

export type User = UserBase
