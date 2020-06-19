import { IUser } from '../../domain/models/user';

export const USER_PROFILE_LOADED = 'USER_PROFILE_LOADED';
export const HANDLE_AUTHENTICATION = 'HANDLE_AUTHENTICATION';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export type UserProfileLoaded = {
  type: typeof USER_PROFILE_LOADED;
  user: IUser;
};

export type HandleAuthentication = {
  type: typeof HANDLE_AUTHENTICATION;
  tokenId: string;
};

export type SignIn = {
  type: typeof SIGN_IN;
  email: string;
  password: string;
};

export type SignOut = {
  type: typeof SIGN_OUT;
};

export type SignUp = {
  type: typeof SIGN_UP;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthActionTypes = UserProfileLoaded | HandleAuthentication | SignUp | SignIn | SignOut;
