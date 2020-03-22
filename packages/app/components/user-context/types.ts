export interface UserIdentifier {
  role?: string;
  userId?: string;
}

export interface QueryProps {
  user: {
    id: string;
    email: string;
    username: string;
  }[];
}
