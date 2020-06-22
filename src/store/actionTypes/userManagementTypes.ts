import { IUser } from '../../domain/models/user';
import { IUserForSaving } from '../../domain/models/userForSaving';

export const LOAD_USERS = 'LOAD_USERS';
export const USERS_LOADED = 'USERS_LOADED';
export const SAVE_USER = 'SAVE_USER';

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

export type UserManagementTypes = LoadUsers | UsersLoaded | SaveUser;
