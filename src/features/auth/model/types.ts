export type User = {
  username: string;
  password: string;
};

export enum AuthStatus {
  Pending,
  Succeed,
  Error,
}

export type AuthSliceState = {
  auth: { isAuthorized: boolean; status: AuthStatus };
  error: null | { message: string };
};
