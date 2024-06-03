export type User = {
  username: string;
  password: string;
};

export type AuthSliceState = {
  auth: { isAuthorized: boolean };
  error: null | { message: string };
};
