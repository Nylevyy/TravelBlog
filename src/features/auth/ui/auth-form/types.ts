export enum AuthFormFields {
  Password = 'password',
  Username = 'username',
}

export type AuthFormValues = {
  [AuthFormFields.Password]: string;
  [AuthFormFields.Username]: string;
};
