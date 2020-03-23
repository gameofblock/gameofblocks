export interface ForgotPasswordFormValues {
  email: string;
}

export enum ForgotPasswordRequestState {
  DEFAULT,
  FAILED,
  SUCCEEDED
}
