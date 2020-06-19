import {
  HANDLE_AUTHENTICATION,
  USER_PROFILE_LOADED,
  HandleAuthentication,
  UserProfileLoaded,
  SignUp,
  SIGN_UP,
  SignIn,
  SIGN_IN,
  SignOut,
  SIGN_OUT
} from '../actionTypes/authActionTypes';
import { IUser } from '../../domain/models/user';

const handleAuthentication = (tokenId: string): HandleAuthentication => {
  return {
    type: HANDLE_AUTHENTICATION,
    tokenId: tokenId
  };
};

const userProfileLoaded = (user: IUser): UserProfileLoaded => {
  return {
    type: USER_PROFILE_LOADED,
    user: user
  };
};

const signUp = (email: string, password: string, confirmPassword: string): SignUp => {
  return {
    type: SIGN_UP,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  };
};

const signIn = (email: string, password: string): SignIn => {
  return {
    type: SIGN_IN,
    email: email,
    password: password
  };
};

const signOut = (): SignOut => {
  return {
    type: SIGN_OUT
  };
};

export const AuthActionCreators = {
  handleAuthentication,
  userProfileLoaded,
  signUp,
  signIn,
  signOut
};
