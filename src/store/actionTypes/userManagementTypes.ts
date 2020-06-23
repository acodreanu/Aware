import { IUser } from '../../domain/models/user';
import { IUserForSaving } from '../../domain/models/userForSaving';

export const LOAD_USERS = 'LOAD_USERS';
export const USERS_LOADED = 'USERS_LOADED';
export const SAVE_USER = 'SAVE_USER';
export const USER_SAVED = 'USER_SAVED';
export const DELETE_USER = 'DELETE_USER';
export const USER_DELETED = 'USER_DELETED';

export type LoadUsers = {
  type: typeof LOAD_USERS;
};

export type UsersLoaded = {
  type: typeof USERS_LOADED;
  users: IUser[];
};

export type SaveUser = {
  type: typeof SAVE_USER;
  user: IUserForSaving;
};

export type UserSaved = {
  type: typeof USER_SAVED;
  user: IUser;
};

export type DeleteUser = {
  type: typeof DELETE_USER;
  email: string;
};

export type UserDeleted = {
  type: typeof USER_DELETED;
  email: string;
};

export type UserManagementTypes = LoadUsers | UsersLoaded | SaveUser | UserSaved | DeleteUser | UserDeleted;
