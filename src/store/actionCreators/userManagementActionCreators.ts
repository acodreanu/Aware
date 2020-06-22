import {
  LoadUsers,
  LOAD_USERS,
  UsersLoaded,
  USERS_LOADED,
  SaveUser,
  SAVE_USER
} from '../actionTypes/userManagementTypes';
import { IUser } from '../../domain/models/user';
import { IUserForSaving } from '../../domain/models/userForSaving';

const loadUsers = (): LoadUsers => {
  return {
    type: LOAD_USERS
  };
};

const usersLoaded = (users: IUser[]): UsersLoaded => {
  return {
    type: USERS_LOADED,
    users: users
  };
};

const saveUser = (user: IUserForSaving): SaveUser => {
  return {
    type: SAVE_USER,
    user: user
  };
};

export const UserManagementActionCreators = { loadUsers, usersLoaded, saveUser };
