import {
  LoadUsers,
  LOAD_USERS,
  UsersLoaded,
  USERS_LOADED,
  SaveUser,
  SAVE_USER,
  DeleteUser,
  DELETE_USER,
  UserSaved,
  UserDeleted,
  USER_DELETED,
  USER_SAVED
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

const userSaved = (user: IUser): UserSaved => {
  return {
    type: USER_SAVED,
    user: user
  };
};

const deleteUser = (email: string): DeleteUser => {
  return {
    type: DELETE_USER,
    email: email
  };
};

const userDeleted = (email: string): UserDeleted => {
  return {
    type: USER_DELETED,
    email: email
  };
};

export const UserManagementActionCreators = { loadUsers, usersLoaded, saveUser, userSaved, deleteUser, userDeleted };
