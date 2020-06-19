import { LoadUsers, LOAD_USERS, UsersLoaded, USERS_LOADED } from '../actionTypes/userManagementTypes';
import { IUser } from '../../domain/models/user';

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

export const UserManagementActionCreators = { loadUsers, usersLoaded };
