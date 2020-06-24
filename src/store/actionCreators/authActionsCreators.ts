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
import { RoleType } from '../../domain/enums/roleType';

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

const signUp = (name: string, email: string, role: RoleType, password: string, confirmPassword: string): SignUp => {
  return {
    type: SIGN_UP,
    name: name,
    email: email,
    role: role,
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
