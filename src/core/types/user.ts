
export type IUserDetails = {
    token: string;
    name: string;
    email: string;
    username: string;
    bio: string;
};

export type IAuthDetails = {
  token: string;
  username: string;
}

export enum AuthStatusEnum {
  AUTHORIZED = 1,
  UNAUTHORIZED = 0,
}