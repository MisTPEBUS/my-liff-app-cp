export type UserResponse = {
  name: string;
  avatar: string;
};

export type LoginResponseData = {
  token: string;
  user: UserResponse;
};

export type LoginResponse = LoginResponseData;
export type SignUpResponse = LoginResponseData;
export type StoreLoginResponse = LoginResponseData;
export type StoreSignUpResponse = LoginResponseData;
