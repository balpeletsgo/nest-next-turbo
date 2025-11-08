export type SignInRequestDTO = {
  email: string;
  password: string;
};

export type SignUpRequestDTO = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
